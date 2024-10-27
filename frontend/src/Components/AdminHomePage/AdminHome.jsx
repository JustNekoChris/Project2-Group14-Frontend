import React, { useState } from 'react';
import styles from './AdminHome.module.css';

const AdminHome = () => {
  const [email, setEmail] = useState('');
  const [userDetails, setUserDetails] = useState({});

  // Handlers for API Requests
  const handleCreateUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users?email=${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });
      if (response.ok) {
        alert('User created successfully!');
      } else {
        alert('Failed to create user.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async () => {
    const confirmation = window.confirm(`Are you sure you want to delete the user with email ${email}?`);
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:8080/users?email=${email}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('User deleted successfully!');
        } else {
          alert('Failed to delete user.');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users?email=${email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });
      if (response.ok) {
        alert('User updated successfully!');
      } else {
        alert('Failed to update user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Render UI
  return (
    <div className={styles.wrapper}>
      <h1>Admin Home</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Additional User Details (JSON format)"
        onChange={(e) => setUserDetails({ ...userDetails, ...JSON.parse(e.target.value) })}
      />
      <button onClick={handleCreateUser}>Create User</button>
      <button onClick={handleDeleteUser}>Delete User</button>
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default AdminHome;
