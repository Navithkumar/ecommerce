import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import favicon from '../assets/favicon/favicon.png';
import './home.css';
import { Link } from 'react-router-dom';
import Home_logo from '../assets/home_images/ecommerce-arrow.jpg';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Products from '../Products/Products';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState(null);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    useEffect(() => {
        document.title = 'Home';

        const token = localStorage.getItem('access');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp > currentTime) {
                    setIsLoggedIn(true);
                    handleProfile(decoded.user_id, token);
                } else {
                    localStorage.removeItem('access');
                    setIsLoggedIn(false);
                }
            } catch (err) {
                console.error('Invalid token');
                setIsLoggedIn(false);
            }
        }
    }, []);

    const handleProfile = async (userId, token) => {
        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/api/v1/user/view/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            setProfile(res.data.data);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access');
        setIsLoggedIn(false);
        setProfile(null);
        setShowProfilePopup(false);
    };

    return (
        <>
            {' '}
            <div>
                <Helmet>
                    <title>Home</title>
                    <link rel="icon" type="image/svg+xml" href={favicon} />
                </Helmet>

                <div className="navbar">
                    <div className="logo mx-5">
                        <Link to="/">
                            <img src={Home_logo} alt="Myntra Logo" />
                        </Link>
                    </div>

                    <div className="nav-menu">
                        <div>Men</div>
                        <div>Women</div>
                        <div>Kids</div>
                        <div>Home</div>
                        <div>Beauty</div>
                    </div>

                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for products, brands and more"
                        />
                    </div>

                    <div className="user-menu">
                        <div style={{ position: 'relative' }}>
                            <i className="bi bi-person"></i>
                            {isLoggedIn ? (
                                <span
                                    onClick={() =>
                                        setShowProfilePopup((prev) => !prev)
                                    }
                                >
                                    Profile
                                </span>
                            ) : (
                                <Link to="/login">
                                    <span style={{ color: 'black' }}>
                                        Login
                                    </span>
                                </Link>
                            )}

                            {showProfilePopup && isLoggedIn && profile && (
                                <div className="profile-popup">
                                    <p>
                                        <strong>{profile.username}</strong>
                                    </p>
                                    <p>{profile.email}</p>
                                    <p>Role: {profile.role || 'User'}</p>
                                    <button onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        <div>
                            <i className="bi bi-heart"></i>
                            <span>Wishlist</span>
                        </div>
                        <div>
                            <i className="bi bi-bag"></i>
                            <span>Bag</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Products />
                </div>
            </div>
        </>
    );
}

export default Home;
