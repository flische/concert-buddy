import React from 'react';
import './landing.css'
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import Carousel from './carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Landing = () => {
    return (
        <div className="landing">
            <div className="logo-holder landing-logo">
                <img src={logo} />
                <h1>CONCERT BUDDY</h1>
                <h3>Plan Your Concert Trip</h3>
            </div>
            <div className="carousel-container">
                <Carousel />
            </div>
            <div className="buttons">
                <Link to='/sign-in'><div className="btn pink-btn">LOGIN</div></Link>
                <Link to="/search-concerts"><div className="btn white-btn">SEARCH CONCERTS</div></Link>
            </div>
        </div>
    );
}

export default Landing;