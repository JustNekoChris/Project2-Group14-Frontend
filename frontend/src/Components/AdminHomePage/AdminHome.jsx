import React from 'react';
import './AdminHome.css';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const AdminPage = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="title">Welcome Admin</h1> 
        <nav className="navbar">
          <ul>
            <li><Link to="/users">Users</Link></li>  
            <li><Link to="/logout">Logout</Link></li> 
            <li><Link to="/mywishlist">Add to Wishlist</Link></li>  
            <li><Link to="/addtowishlist">My Wishlist</Link></li>
          </ul>
        </nav>
      </header>

      <div className="content">
        <h1>Welcome to the Admin Panel</h1>
      </div>
    </div>
  );
}

export default AdminHome;
