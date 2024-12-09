import React from 'react';
import './Homepage.css';
import Logo from '../../src/assets/big-logo.png';

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="homepage-content">
                <img src={Logo} alt="IT Logo" className="homepage-logo" />
            </div>
        </div>
    );
};

export default Homepage;
