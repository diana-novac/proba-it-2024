import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../src/assets/logo.png';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to="/" className="navbar-logo">
                        <img src={logo} alt="chefIT Logo" />
                    </Link>
                    <Link to="/recipes" className="nav-links">
                        Recipes
                    </Link>
                    <Link to="/add-recipe" className="nav-links">
                        Add Recipe
                    </Link>
                </div>
                <div className="navbar-right">
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="nav-links">
                                Profile
                            </Link>
                            <button className="logout-btn" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-links">
                                Login
                            </Link>
                            <Link to="/register" className="nav-links register">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
