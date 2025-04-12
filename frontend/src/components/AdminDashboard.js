import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUser from './AddUser';
import AddStore from './AddStore';
import UserList from './UserList';
import StoreList from './StoreList';
import '../css/dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ userCount: 0, storeCount: 0, ratingCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStats(res.data);
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <div className="stats">
        <p>Total Users: {stats.userCount}</p>
        <p>Total Stores: {stats.storeCount}</p>
        <p>Total Ratings: {stats.ratingCount}</p>
      </div>
      <AddUser />
      <AddStore />
      <UserList />
      <StoreList />
    </div>
  );
};

export default AdminDashboard;