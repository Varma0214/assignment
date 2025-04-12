import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdatePassword from './UpdatePassword';
import '../css/dashboard.css';

const StoreOwnerDashboard = () => {
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/store/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStoreData(res.data);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <h2>Store Owner Dashboard</h2>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <UpdatePassword />
      {storeData && (
        <div>
          <h3>Store: {storeData.store.name}</h3>
          <p>Average Rating: {storeData.store.average_rating || 'No ratings yet'}</p>
          <h4>Ratings</h4>
          <ul>
            {storeData.ratings.map((rating, index) => (
              <li key={index}>
                {rating.name}: {rating.rating}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;