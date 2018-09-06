import './nav.css';
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';


class Nav extends Component {

    constructor(props) {
        super(props)
    }
    state = {
        isOpen: false
    }
    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleRenderLinkClicks(){
        const {auth, signIn, signOut} = this.props;
        console.log('signIn', signIn);
       
        this.setState({
            isOpen: !this.state.isOpen
        });

        if(auth){
            signOut();
        } else {
            signIn();
        }     
    }

    renderLinks(){
        const { auth, signIn, signOut} = this.props;

        if(auth){
            return (
                <Fragment>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} exact to='/' className='navlink'>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} to="/planner" className="navlink">PLANNER HOMEPAGE</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} to="/invite" className="navlink">INVITE FRIENDS</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} to="/responsibilities" className="navlink">RESPONSIBILITIES</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} to="/search-concerts" className="navlink">SEARCH CONCERTS</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} to="/about-page" className="navlink">ABOUT</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} to="/team" className="navlink">MEET THE TEAM</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleRenderLinkClicks.bind(this)} to="/" className="navlink">SIGN OUT</NavLink>
                    </li>
                </Fragment>
           );
        }
            return (
                <Fragment>
                    <li>
                        <NavLink onClick={this.handleRenderLinkClicks.bind(this)} to="/sign-in" className="navlink">SIGN IN</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} exact to='/' className='navlink'>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} to="/search-concerts" className="navlink">SEARCH CONCERTS</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} to="/about-page" className="navlink">ABOUT</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={this.handleClick.bind(this)} className="navlink" to="/sign-up">SIGN UP</NavLink>
                    </li>
                </Fragment>
            );
        }

    render() {
        return (

            <nav role="navigation">
                <div id="menuToggle">
                    <input onClick={this.handleClick.bind(this)} className="opacity" type="checkbox" checked={this.state.isOpen} />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        {this.renderLinks()}
                    </ul>
                </div>
            </nav>


        );
    }

}

function mapStateToProps(state) {
    return {
        auth: state.userAuth.auth
    }
}

export default connect(mapStateToProps,{
    signIn: signIn,
    signOut: signOut
}
)(Nav);