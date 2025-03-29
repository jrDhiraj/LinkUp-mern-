import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaUsers, FaGlobe } from 'react-icons/fa';
import "./LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="app-container">
            {/* Navbar */}
            <nav className="navbar">
                <h1 className="logo">Linkup</h1>
                <div className="nav-buttons">
                    <button className="nav-button guest-button" onClick={() => navigate('/guest')}>Join as Guest</button>
                    <button className="nav-button register-button" onClick={() => navigate('/auth')}>Register</button>
                    <button className="nav-button login-button" onClick={() => navigate('/auth')}>Login</button>
                </div>
            </nav>
            
            {/* Hero Section */}
            <div className="hero-section">
                <h1 className="hero-title">
                    <span>Connect</span> with Your Loved Ones
                </h1>
                <h2 className="hero-subtitle">Bridge the distance with Linkup</h2>
                <Link 
                    to={localStorage.getItem('token') ? "/home" : "/auth"} 
                    className="join-button"
                >
                    
                    Join Now
                </Link>

                {
                    console.log("token is this",localStorage.getItem('token'))
                }
            </div>

            {/* Features Section */}
            <div className="features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <FaUsers className="feature-icon icon-blue" />
                        <h3 className="feature-title">Meet New People</h3>
                        <p className="feature-description">Expand your network and make new connections easily.</p>
                    </div>
                    <div className="feature-card">
                        <FaGlobe className="feature-icon icon-green" />
                        <h3 className="feature-title">Global Access</h3>
                        <p className="feature-description">Connect with friends and family from anywhere in the world.</p>
                    </div>
                    <div className="feature-card">
                        <FaUserPlus className="feature-icon icon-red" />
                        <h3 className="feature-title">Easy Sign Up</h3>
                        <p className="feature-description">Register in just a few clicks and start chatting instantly.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 Linkup. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;