import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="title">Wish List</h1>
        <nav className="navbar">
          <ul>
            <li><a href="/logout">Logout</a></li>
            <li><a href="/mywishlist">My Wishlist</a></li>
            <li><a href="/addtowishlist">Add to Wishlist</a></li>
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
