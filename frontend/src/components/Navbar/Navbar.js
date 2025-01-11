import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';
import logo from '../../images/logo.png';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMenu = () => setClick(false);

    return (
        <div className='navbar'>
            <div className='navbar-container'>
                <Link to="/" className='navbar-logo' onClick={closeMenu}>
                    <img src={logo} alt="Refer-Tag Logo" className='navbar-icon' />
                    <div className='company-name'>
                        Refer-Tag
                    </div>
                </Link>

                <div className='menu-icon' onClick={handleClick}>
                    {click ? <FaTimes size={30} style={{ color: '#ffffff' }} /> : <FaBars size={30} style={{ color: '#ffffff' }} />}
                </div>

                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link to="/about" className='nav-links' onClick={closeMenu}>About</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/login" className='nav-links' onClick={closeMenu}>Login</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/signup" className='nav-links' onClick={closeMenu}>Sign Up</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
