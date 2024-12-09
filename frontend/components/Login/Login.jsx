import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email: formData.email,
                password: formData.password
            });

            setSuccess('Login successful!');

            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (err) {
            let errorMessage = 'Login failed';
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            }
            setError(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Loghează-te, chiorăie mațele!</h2>
                <div className="form-group">
                    <span className="icon">✉️</span>
                    <input
                        type="email"
                        id="email"
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
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="submit-button">Log in</button>
                <p className="forgot-password">Forgot password</p>
            </form>
        </div>
    );
};

export default Login;
