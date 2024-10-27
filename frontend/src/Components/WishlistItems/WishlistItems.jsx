import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './WishlistItems.module.css';
import { getCookie } from '../HelpFunctions/cookieUtils';

const WishlistItems = () => {
    const navigate = useNavigate();
    const { wishlistID } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        link: '',
        image_link: '',
        amount_wanted: 1,
        description: '',
    });
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:8080/items/wishlist?wishlistID=${wishlistID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setItems(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            const userIdFromCookie = getCookie("userID");
            const response = await fetch(`http://localhost:8080/wishlist/single?wishlistID=${wishlistID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch wishlist');
            }
            const data = await response.json();
            if (data.userID === userIdFromCookie) {
                setIsOwner(true);
            }
        };

        fetchWishlist();
        fetchItems();
    }, [wishlistID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/items/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    wishlistID: wishlistID,
                    name: newItem.name,
                    price: newItem.price,
                    link: newItem.link,
                    image_link: newItem.image_link,
                    amount_wanted: newItem.amount_wanted,
                    description: newItem.description,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create item');
            }

            setNewItem({
                name: '',
                price: '',
                link: '',
                image_link: '',
                amount_wanted: 1,
                description: '',
            });
            setModalOpen(false);
            fetchItems();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/items/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    productID: selectedItem.productID,
                    name: newItem.name,
                    price: newItem.price,
                    link: newItem.link,
                    image_link: newItem.image_link,
                    amount_wanted: newItem.amount_wanted,
                    description: newItem.description,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            setEditModalOpen(false);
            setSelectedItem(null);
            fetchItems();
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const openDetailModal = (item) => {
        setSelectedItem(item);
    };

    const openEditModal = () => {
        setNewItem(selectedItem);
        setEditModalOpen(true);
    };

    const openDeleteConfirm = (item) => {
        setSelectedItem(item);
        setDeleteConfirmOpen(true);
    };

    const deleteItem = async () => {
        try {
            const response = await fetch(`http://localhost:8080/items/remove?productID=${selectedItem.productID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            setDeleteConfirmOpen(false);
            setSelectedItem(null);
            fetchItems();
        } catch (error) {
            setError(error.message);
        }
    };

    const navigateBack = () => {
        navigate("/mywishlist");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!isOwner) {
        return <p>You are not authorized to view this page.</p>;
    } else {
        return (
            <div className={styles.container}>
                <h1>Items in Wishlist {wishlistID}</h1>
                <button onClick={navigateBack}>Back to Wishlists</button>
                <button onClick={toggleModal}>Add New Item</button>

                {modalOpen && (
                    <div className={styles.modal}>
                        <h2>Create New Item</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Name:</label>
                            <input type="text" name="name" value={newItem.name} onChange={handleChange} required />
                            <label>Price:</label>
                            <input type="number" name="price" value={newItem.price} onChange={handleChange} required />
                            <label>Link:</label>
                            <input type="text" name="link" value={newItem.link} onChange={handleChange} required />
                            <label>Image Link:</label>
                            <input type="text" name="image_link" value={newItem.image_link} onChange={handleChange} />
                            <label>Amount Wanted:</label>
                            <input type="number" name="amount_wanted" value={newItem.amount_wanted} onChange={handleChange} min={1} />
                            <label>Description:</label>
                            <textarea name="description" value={newItem.description} onChange={handleChange} />
                            <button type="submit">Create Item</button>
                            <button type="button" onClick={toggleModal}>Cancel</button>
                        </form>
                    </div>
                )}

                {deleteConfirmOpen && (
                    <div className={styles.modal}>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete {selectedItem?.name}?</p>
                        <button onClick={deleteItem}>Yes, Delete</button>
                        <button onClick={() => setDeleteConfirmOpen(false)}>Cancel</button>
                    </div>
                )}

                {selectedItem && !deleteConfirmOpen && (
                    <div className={styles.itemModal}>
                        <h2>{selectedItem.name}</h2>
                        {selectedItem.image_link && (
                            <img src={selectedItem.image_link} alt={selectedItem.name} />
                        )}
                        <p><strong>Price:</strong> ${selectedItem.price}</p>
                        <p><strong>Description:</strong> {selectedItem.description}</p>
                        <p><strong>Amount Wanted:</strong> {selectedItem.amount_wanted}</p>
                        <p><strong>Link:</strong> <a href={selectedItem.link} target="_blank" rel="noopener noreferrer">{selectedItem.link}</a></p>
                        <button onClick={openEditModal}>Edit</button>
                        <button onClick={() => setSelectedItem(null)}>Close</button>
                    </div>
                )}

                {editModalOpen && (
                    <div className={styles.modal}>
                        <h2>Edit Item</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label>Name:</label>
                            <input type="text" name="name" value={newItem.name} onChange={handleChange} required />
                            <label>Price:</label>
                            <input type="number" name="price" value={newItem.price} onChange={handleChange} required />
                            <label>Link:</label>
                            <input type="text" name="link" value={newItem.link} onChange={handleChange} required />
                            <label>Image Link:</label>
                            <input type="text" name="image_link" value={newItem.image_link} onChange={handleChange} />
                            <label>Amount Wanted:</label>
                            <input type="number" name="amount_wanted" value={newItem.amount_wanted} onChange={handleChange} min={1} />
                            <label>Description:</label>
                            <textarea name="description" value={newItem.description} onChange={handleChange} />
                            <button type="submit">Update Item</button>
                            <button type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
                        </form>
                    </div>
                )}

                <ul>
                    {items.map((item) => (
                        <li key={item.productID}>
                            <span>{item.name}</span>
                            <div>
                                <button onClick={() => openDetailModal(item)}>View Details</button>
                                <button onClick={() => openDeleteConfirm(item)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default WishlistItems;
