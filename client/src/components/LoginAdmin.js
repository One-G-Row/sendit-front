
import React from "react";
// import Navbar from "./Navbar";
import { useState } from "react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
          const response = await fetch('http://127.0.0.1:5000/admin/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          const data = await response.json();
          if (response.ok) {
              localStorage.setItem('access_token', data.access_token);
              setSuccess('Login successful!');
              // Redirect to admin dashboard or perform other actions
          } else {
              setError(data.message || 'An error occurred');
          }
      } catch (err) {
          setError('An error occurred while logging in.');
      }
  };

  return (
      <div className="container">
          <h2>Admin Login</h2>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                  />
              </div>
              <button type="submit">Login</button>
          </form>
      </div>

  );
};

export default AdminLogin;
