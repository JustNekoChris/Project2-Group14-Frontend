import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const adminFakeEmail = "admin@example.com";
  const adminFakePassword = "adminPassword123";

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (adminEmail === adminFakeEmail && adminPassword === adminFakePassword) {
      alert('Admin login successful');
      navigate('/admin-home'); // Navigate to AdminHome
    } else {
      alert('Invalid admin email or password');
    }
  };

  // Function to navigate back to login
  const backToLogin = () => {
    navigate('/');
  }

  return (
    <div className="wrapper">
      <h1>Admin Login</h1>
      <form onSubmit={handleAdminLogin}>
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter Admin Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login as Admin</button>
      </form>
      <div className="register-link">
        <p>
          Not an Admin? <a href="/">User Login</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
