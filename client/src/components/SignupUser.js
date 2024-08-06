import React, { useState } from 'react';
import './SignupUser.css';

const SignupUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
            const response = await fetch('http://127.0.0.1:5000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('User registered successfully!');
                // Reset form fields after successful registration
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                });
            } else {
                setError(data.message || 'An error occurred');
            }
        } catch (err) {
            setError('An error occurred while registering the user.');
        }
    };

    return (
        <div className="signup-container">
            <h1>Register</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <button type="submit" className="signup-button">Register</button>
            </form>
            <div className="login-link">
                <p>Already have an account? <a href="/LoginUser">Log in</a></p>
            </div>
        </div>
    );
};

export default SignupUser;
