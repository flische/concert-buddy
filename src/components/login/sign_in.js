import './login.css';
import logo from '../../assets/about_team_images//logo.png';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import Input from '../input';
import { resetError } from '../../actions';


class SignIn extends Component {

    login = async (values) => {
        await this.props.signIn(values);

        if (this.props.userAuth) {
            if (window.localStorage.length > 0) {
                if (window.localStorage.getItem("token")) {
                    this.props.history.push("/acceptance-page?token=" + window.localStorage.getItem("token"));
                } else {
                    this.props.history.push("/concert-details" + window.localStorage.getItem("url"));
                }
            } else {
                this.props.history.push('/planner');
            }
        }
    }

    componentDidMount() {
        this.props.resetError();
        window.scrollTo(0, 0);
        var elem = document.getElementById('body');
        elem.classList.remove('remove-overflow');
    }

    render() {
        const { handleSubmit, authError } = this.props;

        return (

            <div className="login">
                <div className="logo-holder login-logo-holder">
                    <img src={logo} />
                    <h1 className="show login-header">CONCERT BUDDY</h1>
                    <h3 className="show login-tagline">Plan Your Concert Trip</h3>
                </div>
                <form onSubmit={handleSubmit(this.login)}>
                    <div className="inputs sign-in">
                        <div className="inline-block"><Field name="email" component={Input} className="login-input" placeholder="Enter Your Email" label="Email" /></div>
                        <div className="inline-block"><Field name="password" type="password" className="login-input" placeholder="Enter Your Password" component={Input} label="Password" /></div>
                        <div className="response">
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="pink-btn">LOGIN</button>
                        <p className="signin-error">{authError}</p>
                    </div>
                </form>
                <div className="buttons login-buttons">
                    <Link to="/sign-up"><div className="btn white-btn"> SIGN UP!</div></Link>
                </div>
            </div>

        );
    }
}

function validate(values) {
    const { email, password } = values;
    const errors = {};

    if (!email) errors.email = 'Please enter your email address';
    
    if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))) errors.email = 'Invalid Email Address'

    if (!password) errors.password = 'Please enter a password';

    return errors;
}

SignIn = reduxForm({
    form: 'sign-in',
    validate: validate
})(SignIn);

function mapStateToProps(state) {
    return {
        authError: state.userAuth.error,
        userAuth: state.userAuth.auth
    }
}

export default connect(mapStateToProps, { signIn, resetError })(SignIn);