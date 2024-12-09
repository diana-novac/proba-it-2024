import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Profile.css';
import ChefImage from '../../src/assets/chef-png.png';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        fullName: '',
        email: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('You are not logged in!');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserData(response.data.profile);
            } catch (err) {
                console.error('Error fetching profile:', err);
                alert('Failed to fetch profile. Please try again.');
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-container">
                <div className="profile-card left">
                    <img src={ChefImage} alt="Chef Icon" className="chef-image" />
                    <h3>{userData.fullName}</h3>
                </div>
                <div className="profile-card right">
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Username:</strong> {userData.username}</p>
                </div>
            </div>
            <div className="add-recipe-btn-container">
                <Link to="/add-recipe">
                    <button className="add-recipe-btn">Add Recipe</button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
