import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SignupAdmin.css';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    first_name: '',  // Updated to match server-side field names
    last_name: '',   // Updated to match server-side field names
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://127.0.0.1:5000/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Admin registered successfully!');
        setTimeout(() => {
          navigate('/loginadmin');  // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred while registering the admin.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Admin Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-form-group">
          <label htmlFor="first_name" className="register-label">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"  // Updated to match server-side field names
            value={formData.first_name}  // Updated to match server-side field names
            onChange={handleChange}
            className="register-input"
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="last_name" className="register-label">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"  // Updated to match server-side field names
            value={formData.last_name}  // Updated to match server-side field names
            onChange={handleChange}
            className="register-input"
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="email" className="register-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            required
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="password" className="register-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
