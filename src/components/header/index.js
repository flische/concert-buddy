import React from 'react';
import logo from '../../images/logo.png';
import './header.css';
import Nav from '../nav';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="top-content" id="top">
            <div className="top-link">
                <Link to='/planner'>
                    <img src={logo} />
                </Link>
                <h1 className="app-name">CONCERT BUDDY</h1>
            </div>
            <Nav />
        </div>

    );
}

export default Header;