import React, { useState, useEffect } from 'react';
import styles from './EditProfile.module.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../HelpFunctions/cookieUtils';
import bcrypt from "bcryptjs-react";

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = !!getCookie("userID")
    if (!isLoggedIn) {
      setShowError(true);
      // Hide the error message after 3 seconds
      const timer = setTimeout(() => {
        setShowError(false);
        navigate('/'); // Redirect to login page
      }, 3000); // Change 3000 to your desired duration in milliseconds
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure password and confirm password match
    if (password !== confirmPassword) {
      setShowError(true);
      return;
    }
  
    // Get userID from the cookie
    const userID = getCookie("userID");
  
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const response = await fetch(`https://project2-group14-c828d1f4017d.herokuapp.com/users/update?userID=${userID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password: hashedPassword, salt }),
      });
  
      // Check for success
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setShowError(true);
    }
  };

  if (showError) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>404 Not Found</h1>
        <p className={styles.errorMessage}>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Edit Profile</h1>
      <button onClick={() => navigate('/home')} className={styles.backButton}>Back</button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Save Changes</button>
      </form>
      {showSuccess && <p className={styles.successMessage}>Profile updated successfully!</p>}
    </div>
  );
};

export default EditProfile;
