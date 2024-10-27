import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Set a cookie
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://project2-group14-c828d1f4017d.herokuapp.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const userObject = JSON.parse(await response.text());
            const message = `Welcome back, ${userObject["name"]}!`;
            // alert(message);
            setCookie("userID", userObject["userID"], 7);  // Sets for 7 days
            setCookie("name", userObject["name"], 7);  // Sets for 7 days
            navigate('/home'); // Successful login
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className={styles.icon}    />
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className={styles.icon} />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className={styles.registerLink}>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <p>
          <a href="/admin-login">Login as an Admin</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
