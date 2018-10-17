import React from 'react';
import logo from '../../assets/about_team_images/logo.png';
import './header.css';
import Nav from '../nav';
import { Link } from 'react-router-dom';

const Header = () => {
    const pageURL = window.location.pathname;

    return (
       
        <div className="top-content" id="top">
         {pageURL === '/' ? '' : 
            <div className="top-link">
            {pageURL === '/' ? '' 
                : 
                <Link to='/planner'>
                    <img src={pageURL === '/sign-in' ? '' : logo} />
                </Link>
            }
            <h1 className="app-name"> {pageURL === '/' ? '' : 'CONCERT BUDDY'}</h1>
  
            </div>
         }
            <Nav />
        </div>
    );
}

export default Header;