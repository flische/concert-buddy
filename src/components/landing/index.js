import React from 'react';
import './landing.css'
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import MyCarousel from './carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Landing = () => {
    return (
        <div className="landing">
            <div className="logo-holder landing-logo">
                <img src={logo} />
                <h1>CONCERT BUDDY</h1>
                <h3>Plan Your Concert Trip</h3>
            </div>



            <div className="carousel-container">
                <MyCarousel />
            </div>


















            <div className="buttons">
                <button className="pink-btn"><Link to='/login'>LOGIN</Link></button>
                <button className="white-btn"><Link to="/search-concerts">SEARCH CONCERTS</Link></button>
            </div>
        </div>
    );
}


export default Landing;