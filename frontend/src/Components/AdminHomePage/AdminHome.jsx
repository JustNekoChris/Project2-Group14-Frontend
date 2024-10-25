import React from 'react';
import './AdminHome.css'; 

const AdminHome = () => {
  return (
    <div className="admin-wrapper">
      <h1>Welcome to the Admin Dashboard</h1>
      
      <nav className="admin-nav">
        <ul>
          <li><a href="/admin-users">Manage Users</a></li>
          <li><a href="/admin-reports">View Reports</a></li>
          <li><a href="/admin-settings">Settings</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminHome;
