import React from 'react';
import logo from '../../images/logo.png';
import './header.css';
import Nav from '../nav';



const Header = () => {
    return (

        <div className="top-content" id="top">
            <div className="top-link">
                <a href="#">
                    <img src={logo} />
                </a>
                <h1 className="app-name">CONCERT BUDDY</h1>

            </div>
            <Nav />
        </div>

    );
}

export default Header;