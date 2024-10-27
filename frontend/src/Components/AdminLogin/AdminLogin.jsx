import React, { useState } from 'react';
import styles from './AdminLogin.module.css';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

    // Set a cookie
    const setCookie = (name, value, days) => {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/`;
    };

    const handleAdminLogin = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch('https://project2-group14-c828d1f4017d.herokuapp.com/login/admin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: adminEmail, password: adminPassword })
          });
  
          const data = await response.json();
  
          if (response.ok) {
              alert(data.message); // Show success message
              navigate('/AdminHome'); // Navigate to Admin dashboard
          } else {
              alert(data.error); // Show error message
          }
      } catch (error) {
          console.error('Error during admin login:', error);
          alert('Something went wrong. Please try again.');
      }
  };

  // Function to navigate back to login
  const backToLogin = () => {
    navigate('/');
  }

  return (
    <div className={styles.wrapper}>
      <h1>Admin Login</h1>
      <form onSubmit={handleAdminLogin}>
        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="Enter Admin Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputBox}>
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
      <div className={styles.registerLink}>
        <p>
          Not an Admin? <a href="/">User Login</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
