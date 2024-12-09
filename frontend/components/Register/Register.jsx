import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                username: formData.username,
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            });

            setSuccess(response.data.message);
            setFormData({
                fullName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            let errorMessage = 'Registration failed';
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            }
            setError(errorMessage);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Hai, fă foamea cu noi!</h2>
                <div className="form-group">
                    <span className="icon">👤</span>
                    <input 
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full name"
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon">👤</span>
                    <input 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon">✉️</span>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-mail"
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon">🔒</span>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="form-group">
                    <span className="icon">🔒</span>
                    <input 
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="submit-button">Sign up</button>
            </form>
        </div>
    );
};

export default Register;
