import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';


const Nav = () => {
    return (

        <nav role="navigation">
            <div id="menuToggle">
                {/* <!--
                                              A fake / hidden checkbox is used as click reciever,
                                              so you can use the :checked selector on it.
                                              --> */}
                <input className="opacity" type="checkbox" />

                {/* <!--Some spans to act as a hamburger.--> */}
                <span></span>
                <span></span>
                <span></span>

                <ul id="menu">

                    <li><NavLink exact to='/' className='navlink'>HOME</NavLink></li>

                    <li><NavLink exact to='/login' className='navlink'>LOGIN</NavLink></li>


                    <li><NavLink to="/search-concerts" className="navlink">SEARCH CONCERTS</NavLink></li>

                    <li>
                        <NavLink to="/planner" className="navlink">PLANNER HOMEPAGE</NavLink>
                    </li>

                    <li>
                        <NavLink to="/invite" className="navlink">INVITE FRIENDS</NavLink>
                    </li>
                </ul>
            </div>
        </nav>


    );
}

export default Nav;