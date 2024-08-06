import React, { useState } from 'react';
import './LoginAdmin.css';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log('Admin Email:', email);
    console.log('Admin Password:', password);
  };

  return (
    <div className="login-admin-container">
      <h2 className="login-admin-title">Admin Login</h2>
      <form className="login-admin-form" onSubmit={handleLogin}>
        <div className="login-admin-form-group">
          <label htmlFor="email" className="login-admin-label">Email</label>
          <input
            type="email"
            id="email"
            className="login-admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-admin-form-group">
          <label htmlFor="password" className="login-admin-label">Password</label>
          <input
            type="password"
            id="password"
            className="login-admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-admin-button" type="submit">Log in</button>
      </form>
      <div className="login-admin-footer">
        <a href="#" className="login-admin-link">Forgot password?</a>
        <a href="./SignupAdmin" className="login-admin-link">Sign up</a>
      </div>
    </div>
  );
};

export default LoginAdmin;
