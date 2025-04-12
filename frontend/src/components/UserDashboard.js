import React, { useState } from 'react';
import StoreList from './StoreList';
import UpdatePassword from './UpdatePassword';
import '../css/dashboard.css';

const UserDashboard = () => {
  const [searchFilters, setSearchFilters] = useState({ name: '', address: '' });

  const handleSearchChange = (e) => {
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <UpdatePassword />
      <div className="search">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={searchFilters.name}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Search by address"
          value={searchFilters.address}
          onChange={handleSearchChange}
        />
      </div>
      <StoreList filters={searchFilters} isUser={true} />
    </div>
  );
};

export default UserDashboard;