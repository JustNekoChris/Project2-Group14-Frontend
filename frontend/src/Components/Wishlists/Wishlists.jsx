import React, { useState, useEffect } from "react";
import styles from "./Wishlists.module.css";
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../HelpFunctions/cookieUtils';

const Wishlists = () => {
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [name, setName] = useState("");
    const [userID, setUserID] = useState("");
    const [wishlists, setWishlists] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newWishlistName, setNewWishlistName] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [wishlistToDelete, setWishlistToDelete] = useState(null);

    useEffect(() => {
        const userIdFromCookie = getCookie("userID");
        const isLoggedIn = !!userIdFromCookie;
        setName(getCookie("name"));
        setUserID(userIdFromCookie);

        if (!isLoggedIn) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
                navigate('/'); // Redirect to login page
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            fetchWishlists(userIdFromCookie);
        }
    }, [navigate]);

    const fetchWishlists = async (userID) => {
        try {
            const response = await fetch(`https://project2-group14-c828d1f4017d.herokuapp.com/wishlist/user?userID=${userID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch wishlists');
            }
            const data = await response.json();
            setWishlists(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateWishlist = async () => {
        try {
            const response = await fetch(`https://project2-group14-c828d1f4017d.herokuapp.com/wishlist/create?userID=${userID}&wishlistName=${newWishlistName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Check if the response is created (201)
            if (response.ok) {
                const createdWishlist = await response.json();
                setWishlists((prevWishlists) => [...prevWishlists, createdWishlist]);
                setShowModal(false); // Close the modal
                setNewWishlistName(""); // Clear the input
            } else {
                const errorMessage = await response.text();
                console.error("Failed to create wishlist:", errorMessage);
                // Optionally display an error message to the user
            }
        } catch (error) {
            console.error("Error creating wishlist:", error);
        }
    };

    const handleDeleteWishlist = async (wishlistID) => {
        try {
            const response = await fetch(`https://project2-group14-c828d1f4017d.herokuapp.com/wishlist/delete?wishlistID=${wishlistID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setWishlists((prevWishlists) => prevWishlists.filter(wishlist => wishlist.wishlistID !== wishlistID));
                setShowDeleteModal(false); // Close the delete modal
            } else {
                const errorMessage = await response.text();
                console.error("Failed to delete wishlist:", errorMessage);
            }
        } catch (error) {
            console.error("Error deleting wishlist:", error);
        }
    };

    const confirmDelete = () => {
        if (wishlistToDelete) {
            handleDeleteWishlist(wishlistToDelete);
        }
    };

    if (showError) {
        return (
            <div style={{ color: 'red', background: 'white' }}>
                <h1>404 Not Found</h1>
                <p>You are not logged in.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>
                    {name}'s Wishlists
                    <button onClick={() => setShowModal(true)} className={styles.newWishlistButton}>
                        + New Wishlist
                    </button>
                    <button onClick={() => navigate('/Home')} className={styles.homeButton}>
                        Home
                    </button>
                </h1>
            </div>
            <br />
            <div className={styles.wishlists}>
                {wishlists.length > 0 ? (
                    wishlists.map((wishlist) => (
                        <div key={wishlist.wishlistID} className={styles.wishlistItem}>
                            <h2>{wishlist.wishlistName}</h2>
                            <button
                                className={styles.viewButton} // Add a class for styling if needed
                                onClick={() => navigate(`/wishlist-items/${wishlist.wishlistID}`)}
                            >
                                View
                            </button>
                            <button
                                className={styles.deleteButton}
                                onClick={() => {
                                    setWishlistToDelete(wishlist.wishlistID);
                                    setShowDeleteModal(true);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No wishlists found.</p>
                )}
            </div>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Create New Wishlist</h2>
                        <input
                            type="text"
                            placeholder="Wishlist Name"
                            value={newWishlistName}
                            onChange={(e) => setNewWishlistName(e.target.value)}
                        />
                        <button onClick={handleCreateWishlist}>Create</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this wishlist?</p>
                        <button onClick={confirmDelete}>Yes, Delete</button>
                        <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlists;
