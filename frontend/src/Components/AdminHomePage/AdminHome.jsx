import React from 'react';
import styles from './AdminHome.module.css'; 

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

      <div className="admin-overview">
        <div className="overview-box">
          <h2>Total Users</h2>
          <p>150</p>
        </div>
        <div className="overview-box">
          <h2>Active Sessions</h2>
          <p>30</p>
        </div>
        <div className="overview-box">
          <h2>Pending Reports</h2>
          <p>5</p>
        </div>
      </div>

      <div className="admin-content">
        <h2>Recent Activities</h2>
        <ul>
          <li>User JohnDoe123 updated profile information.</li>
          <li>Admin added new user permissions.</li>
          <li>User JaneDoe456 submitted a report.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
