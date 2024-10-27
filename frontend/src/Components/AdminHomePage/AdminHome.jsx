import React, { useState, useEffect } from 'react';
import styles from './AdminHome.module.css'; // Using SignupForm styles directly

const AdminHome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to handle form submission like signup
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Input validation
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const userDetails = { email, password, name };

    try {
      const response = await fetch('http://localhost:8080/users/signup', {
        method: 'POST', // Assuming signup uses POST, adjust if needed
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        setSuccess('User created successfully!');
        setEmail('');
        setPassword('');
        setName('');
        fetchUsers(); // Refresh the user list
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create user.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleDeleteUser = async (userID) => {
    const confirmation = window.confirm(`Are you sure you want to delete the user with ID ${userID}?`);
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:8080/users/remove?userID=${userID}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('User deleted successfully!');
          fetchUsers(); // Refresh the user list
        } else {
          alert('Failed to delete user.');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleUpdateUser = async (userID) => {
    const updatedDetails = prompt('Enter new user details in JSON format:', '{}');
    if (updatedDetails) {
      try {
        const response = await fetch(`http://localhost:8080/users/update?userID=${userID}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: updatedDetails,
        });
        if (response.ok) {
          alert('User updated successfully!');
          fetchUsers(); // Refresh the user list
        } else {
          alert('Failed to update user.');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  // Render UI
  return (
    <div className={styles.wrapper}>
      <h1>Create User</h1>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <form onSubmit={handleCreateUser}>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <i className={`${styles.icon} fas fa-user`}></i>
        </div>
        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className={`${styles.icon} fas fa-envelope`}></i>
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className={`${styles.icon} fas fa-lock`}></i>
        </div>
        <button className={styles.button} type="submit">Create User</button>
      </form>
      
      <div className={styles.adminContent}>
        <h2>User List</h2>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.userID}>
              <span>{user.email}</span>
              <button className={styles.button} onClick={() => handleUpdateUser(user.userID)}>Update</button>
              <button className={styles.button} onClick={() => handleDeleteUser(user.userID)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
