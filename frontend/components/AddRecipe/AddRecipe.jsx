import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './AddRecipe.css';
import axios from 'axios';

const AddRecipe = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
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

        if (!formData.name || !formData.description) {
            setError('Both fields are required.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to add a recipe.');
                return;
            }

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/recipes/add-recipe`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess(response.data.message);
            setFormData({ name: '', description: '' });
        } catch (err) {
            let errorMessage = 'Failed to add recipe.';
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            }
            setError(errorMessage);
        }
    };

    return (
        <div className="add-recipe-page">
            <Navbar />
            <div className="add-recipe-container">
                <form className="add-recipe-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Recipe: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <button type="submit">Add Recipe</button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;
