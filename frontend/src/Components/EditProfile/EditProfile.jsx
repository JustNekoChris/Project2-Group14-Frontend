import React, { useState, useEffect } from 'react';
import styles from './EditProfile.module.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../HelpFunctions/cookieUtils';

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
  
    // Prepare data for the API request
    const updateData = {
      userID,
      name: name || undefined,
      email: email || undefined,
      password: password || undefined,
    };
  
    try {
        const response = await fetch(`http://localhost:8080/users/update?userID=${userID}&name=${name}&email=${email}&password=${password}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID, name, email, password }),
            credentials: 'include', // Include credentials for cross-origin requests
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
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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
