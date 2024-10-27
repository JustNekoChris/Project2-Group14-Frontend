import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminHome.module.css';

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users') 
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
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
