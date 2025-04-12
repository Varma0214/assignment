import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreList = ({ filters = {}, isUser = false }) => {
  const [stores, setStores] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchStores = async () => {
      const res = await axios.get('http://localhost:5000/api/user/stores', {
        params: filters,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStores(res.data);
    };
    fetchStores();
  }, [filters]);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    setStores([...stores].sort((a, b) => {
      if (field === 'average_rating') {
        const valA = a[field] || 0;
        const valB = b[field] || 0;
        return order === 'asc' ? valA - valB : valB - valA;
      }
      const valA = a[field].toLowerCase();
      const valB = b[field].toLowerCase();
      return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }));
  };

  const handleRatingSubmit = async (storeId, rating) => {
    await axios.post(
      'http://localhost:5000/api/user/ratings',
      { storeId, rating },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    const res = await axios.get('http://localhost:5000/api/user/stores', {
      params: filters,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setStores(res.data);
  };

  return (
    <div>
      <h3>Stores</h3>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('address')}>Address</th>
            <th onClick={() => handleSort('average_rating')}>Average Rating</th>
            {isUser && <th>Your Rating</th>}
            {isUser && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.average_rating || 'No ratings'}</td>
              {isUser && <td>{store.userRating || 'Not rated'}</td>}
              {isUser && (
                <td>
                  <select
                    onChange={(e) => handleRatingSubmit(store.id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Rate
                    </option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;