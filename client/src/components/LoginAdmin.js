import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./LoginAdmin.css";

const API = process.env.REACT_APP_SERVER_API;

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API}/loginadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
        return;
      }

      const data = await response.json();
      login({ token: data.access_token, role: "admin" });
      setSuccess("Login successful!");
      navigate("/allorders");
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
