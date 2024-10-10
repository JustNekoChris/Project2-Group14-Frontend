import React, { useState } from 'react';  // Make sure useState is imported
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');  // Correct useState usage
  const [password, setPassword] = useState('');  // Correct useState usage
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    
    // You would validate login credentials here
    // If successful, navigate to the home page
    navigate('/home');  // This will take you to the home page
  };

  return (
    <div className="wrapper">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
