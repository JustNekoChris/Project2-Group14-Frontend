import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fakeEmail = "ricardo@gmail.com";
  const fakePassword = "password123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === fakeEmail && password === fakePassword) {
      navigate('/home'); 
    } else {
      alert('Invalid email or password'); 
    }
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
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
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
