import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Home = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="title">Wish List</h1>
        <nav className="navbar">
          <ul>
            <li><Link to="/logout">Logout</Link></li>  {/* Use Link for Logout */}
            <li><Link to="/mywishlist">Add to Wishlist</Link></li>
            <li><Link to="/addtowishlist">My Wishlist</Link></li>
          </ul>
        </nav>
      </header>

      <div className="content">
        <h1>Welcome to Your Wishlist</h1>
        {/* Rest of your Home page content */}
      </div>
    </div>
  );
}

export default Home;
