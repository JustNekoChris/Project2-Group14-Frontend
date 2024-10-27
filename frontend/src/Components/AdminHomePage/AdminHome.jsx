import React, { useState, useEffect } from 'react';
import styles from './AdminHome.module.css';

const AdminHome = () => {
  const [email, setEmail] = useState('');
  const [userDetails, setUserDetails] = useState({});
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
    try {
      const response = await fetch(`http://localhost:8080/users?email=${email}`, {
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

  const handleDeleteUser = async (userEmail) => {
    const confirmation = window.confirm(`Are you sure you want to delete the user with email ${userEmail}?`);
    if (confirmation) {
      try {
        const response = await fetch(`http://localhost:8080/users?email=${userEmail}`, {
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

  const handleUpdateUser = async (userEmail) => {
    const updatedDetails = prompt('Enter new user details in JSON format:', '{}');
    if (updatedDetails) {
      try {
        const response = await fetch(`http://localhost:8080/users?email=${userEmail}`, {
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
      <h1>Admin Home</h1>
      <div>
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
      </div>
      
      <div className={styles.adminContent}>
        <h2>User List</h2>
        <ul className={styles.userList}>
          {users.map((user, index) => (
            <li key={index}>
              <span>{user.email}</span>
              <button onClick={() => handleUpdateUser(user.email)}>Update</button>
              <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
