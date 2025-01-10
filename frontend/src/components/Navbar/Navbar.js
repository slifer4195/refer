import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMenu = () => setClick(false);

    return (
        <div className='navbar'>
            <div className='navbar-container'>
                <Link to="home" className='navbar-logo' onClick={closeMenu}>
                <FontAwesomeIcon icon={faReact} className='navbar-icon' /> Porfolio
                </Link>

                <div className='menu-icon' onClick={handleClick}>
                    {click ? <FaTimes size={30} style={{ color: '#ffffff' }} /> : <FaBars size={30} style={{ color: '#ffffff' }} />}
                </div>

                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link to="about" className='nav-links' spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>About</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="projects" className='nav-links' spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Projects</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="experience" className='nav-links' spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Experience</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="skills" className='nav-links' spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Skills</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="publication" className='nav-links' spy={true} smooth={true} offset={-70} duration={500} onClick={closeMenu}>Publication</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;