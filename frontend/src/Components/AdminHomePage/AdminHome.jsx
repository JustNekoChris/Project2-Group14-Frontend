import React, { useState, useEffect } from 'react';
import styles from './AdminHome.module.css';

const AdminHome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

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

  // Handlers for API Requests
  const handleCreateUser = async () => {
    const userDetails = { email, password, name };
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });
      if (response.ok) {
        alert('User created successfully!');
        fetchUsers(); // Refresh the user list
      } else {
        alert('Failed to create user.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
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
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.inputBox}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputBox}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleCreateUser}>Create User</button>
      
      <div className={styles.adminContent}>
        <h2>User List</h2>
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.userID}>
              <span>{user.email}</span>
              <button onClick={() => handleUpdateUser(user.userID)}>Update</button>
              <button onClick={() => handleDeleteUser(user.userID)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
