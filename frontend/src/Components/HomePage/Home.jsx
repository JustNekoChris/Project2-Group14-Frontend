import React, { useState, useEffect } from 'react';
import styles from'./Home.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Import Link and Navigate
import { getCookie } from '../HelpFunctions/cookieUtils';

const Home = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = !!getCookie("userID"); // Adjust based on your login logic
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

  // Redirect if the user is logged in
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
      <header className={styles.header}>
        <h1 className={styles.title}>Wish List</h1>
        <nav className={styles.navbar}>
          <ul>
            <li><Link to="/logout">Logout</Link></li>
            <li><Link to="/mywishlist">My Wishlists</Link></li>
            <li><Link to="/editprofile">Edit Profile</Link></li>
            {/* <li><Link to="/addtowishlist">My Wishlist</Link></li> */}
          </ul>
        </nav>
      </header>

      <div className="styles.content">
        <h1>Welcome to Your Wishlist</h1>
        {/* Rest of your Home page content */}
      </div>
    </div>
  );
}

export default Home;
