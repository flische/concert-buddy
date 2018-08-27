import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';

class Nav extends React.Component{
    
    constructor(props){
        super(props)
    }
    state = {
        isOpen: false
    }
    handleClick(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render(){
        return (

            <nav role="navigation">
                <div id="menuToggle">
                    <input onClick={this.handleClick.bind(this)} className="opacity" type="checkbox" checked={this.state.isOpen}/>
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">

                        <li><NavLink onClick={this.handleClick.bind(this)} exact to='/' className='navlink'>HOME</NavLink></li>

                        <li><NavLink onClick={this.handleClick.bind(this)} exact to='/login' className='navlink'>LOGIN</NavLink></li>


                        <li><NavLink onClick={this.handleClick.bind(this)} to="/search-concerts" className="navlink">SEARCH CONCERTS</NavLink></li>

                        <li>
                            <NavLink onClick={this.handleClick.bind(this)} to="/planner" className="navlink">PLANNER HOMEPAGE</NavLink>
                        </li>

                        <li>
                            <NavLink onClick={this.handleClick.bind(this)} to="/invite" className="navlink">INVITE FRIENDS</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>


        ); 
    }
    
}

export default Nav;