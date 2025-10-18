import React, { useState, useEffect, useRef } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="navbar">
                <Link to="/"><img className='logo' src={assets.logo} alt='' /></Link>
                <div className="profile-container" ref={dropdownRef}>
                    <img 
                        className='profile' 
                        src={assets.profile_image} 
                        alt="" 
                        onClick={toggleDropdown}
                    />
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout} className="dropdown-item">
                                <img src={assets.logout_icon} />
                                <p>Logout</p>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar