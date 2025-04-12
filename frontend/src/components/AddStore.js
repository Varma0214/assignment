import React, { useState } from 'react';
import axios from 'axios';
import '../css/forms.css';

const AddStore = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    ownerId: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/stores', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFormData({ name: '', email: '', address: '', ownerId: '' });
      setError('');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h3>Add Store</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Store Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Store Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="ownerId"
          placeholder="Owner ID"
          value={formData.ownerId}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Store</button>
      </form>
    </div>
  );
};

export default AddStore;