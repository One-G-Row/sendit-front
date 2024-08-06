import React, { useState } from 'react';
import './LoginUser.css';

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle user login logic here
    console.log('User Email:', email);
    console.log('User Password:', password);
  };

  return (
    <div className="login-user-container">
      <h2 className="login-user-title">Login User</h2>
      <form className="login-user-form" onSubmit={handleLogin}>
        <div className="login-user-form-group">
          <label htmlFor="email" className="login-user-label">Email</label>
          <input
            type="email"
            id="email"
            className="login-user-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-user-form-group">
          <label htmlFor="password" className="login-user-label">Password</label>
          <input
            type="password"
            id="password"
            className="login-user-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-user-button" type="submit">Log in</button>
      </form>
      <div className="login-user-footer">
        <a href="#" className="login-user-link">Forgot password?</a>
        <a href="./SignupUser" className="login-user-link">Sign up</a>
      </div>
    </div>
  );
};

export default LoginUser;
