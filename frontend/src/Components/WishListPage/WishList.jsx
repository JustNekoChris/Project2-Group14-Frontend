import React, { useState } from "react";
import "./WishList.css";

const WishList = () => {
  const [wish, setWish] = useState({
    url: "",
    quantity: 1,
    name: "",
    price: 0
  });
  const [wishList, setWishList] = useState([]);

  const addWish = () => {
    if (wish.url.trim() !== "") {
      setWishList([...wishList, wish]);
      setWish({
        url: "",
        quantity: 1,
        name: "",
        price: 0
      });
    }
  };

  const removeWish = (index) => {
    const newWishList = wishList.filter((_, i) => i !== index);
    setWishList(newWishList);
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">My Wish List</h1>
      <div className="wishlist-input-container">
        <input
          type="text"
          value={wish.url}
          onChange={(e) => setWish({ ...wish, url: e.target.value })}
          placeholder="Enter item URL..."
          className="wishlist-input"
        />
        <input
          type="number"
          value={wish.quantity}
          onChange={(e) => setWish({ ...wish, quantity: e.target.value })}
          placeholder="Quantity"
          className="wishlist-input small-input"
          min="1"
        />
        <input
          type="text"
          value={wish.name}
          onChange={(e) => setWish({ ...wish, name: e.target.value })}
          placeholder="Name"
          className="wishlist-input small-input"
        />
        <input
          type="number"
          value={wish.price}
          onChange={(e) => setWish({ ...wish, price: e.target.value })}
          placeholder="Price"
          className="wishlist-input small-input"
           min="0"
        />
        <button onClick={addWish} className="wishlist-add-button">
          Add Wish
        </button>
      </div>
      <ul className="wishlist-items">
        {wishList.map((item, index) => (
          <li key={index} className="wishlist-item">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="wishlist-link">
              {item.url}
            </a>
            <div className="wishlist-details">
              <span>Quantity: {item.quantity}</span>
              <span> Name: {item.name}</span>
              <span> Price: ${item.price}</span>
            </div>
            <button
              onClick={() => removeWish(index)}
              className="wishlist-remove-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
