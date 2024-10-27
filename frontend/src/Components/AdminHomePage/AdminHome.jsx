import React, { useEffect, useState } from 'react';
import styles from './AdminHome.module.css';

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:8000/users'); // Replace with your actual backend URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('There was an error fetching the users!', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Admin Dashboard</h1>
      <div className={styles.adminContent}>
        <h2>All Users</h2>
        <ul className={styles.userList}>
          {users.map(user => (
            <li key={user.id}>
              {user.firstName} {user.lastName} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
