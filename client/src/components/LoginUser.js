import React, { useState } from 'react';
import './LoginUser.css';

const LoginUser = () => {
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
            const response = await fetch('http://127.0.0.1:5000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Logged in successfully!');
                // Handle successful login, e.g., store token, redirect, etc.
            } else {
                setError(data.message || 'Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred while logging in.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
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
                <button type="submit" className="login-button">Log In</button>
            </form>
            <div className="signup-link">
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
    );
};

export default LoginUser;
