import React, { Component, Fragment } from 'react';
import './landing.css'
import logo from '../../assets/about_team_images//logo.png';
import { Link } from 'react-router-dom';
import Carousel from './carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { connect } from 'react-redux';

class Landing extends Component {
    componentDidMount() {
        localStorage.clear();
    }
    renderLinks() {
        const { auth } = this.props;

        if (auth) {
            return (
                <Fragment>
                    <div className="buttons buttons-landing">
                        <Link to="/planner"><div className="btn pink-btn">PLANNER HOMEPAGE</div></Link>
                        <Link to="/search-concerts"><div className="btn white-btn">SEARCH CONCERTS</div></Link>
                    </div>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <div className="buttons buttons-landing">
                    <Link to='/sign-in'><div className="btn landing-btn pink-btn">LOGIN</div></Link>
                    <Link to="/search-concerts"><div className="btn landing-btn white-btn">SEARCH CONCERTS</div></Link>
                    <Link to='/sign-up'><div className="btn landing-btn pink-btn">SIGN UP</div></Link>
                </div>
            </Fragment>
        );
    }

    render() {
        return (
            <div className="landing">
                <div className="logo-holder landing-logo">
                    <img src={logo} />
                    <h1 className="company-name">CONCERT BUDDY</h1>
                    <h3 className="tagline">Plan Your Concert Trip</h3>
                </div>
                <div className="carousel-container">
                    <Carousel />
                </div>
                {this.renderLinks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.userAuth.auth
    };
}

export default connect(mapStateToProps)(Landing);
