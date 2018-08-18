import React from 'react';
import './landing.css'
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="login">
            <div className="logo-holder">

                <img src={logo} />


                <h1>CONCERT BUDDY</h1>
                <h3>Plan Your Concert Trip</h3>
            </div>
            <div className="carousel">
                This will be a carousel that gives info on what the app does
        </div>
            <div className="buttons">
                <button className="pink-btn"><Link to='/login'>LOGIN</Link></button>
                <button className="white-btn"><Link to="/search-concerts">SEARCH CONCERTS</Link></button>
            </div>
        </div>
    );
}


export default Landing;