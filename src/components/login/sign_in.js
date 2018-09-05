import './login.css';
import logo from '../../images/logo.png';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import Input from '../input';

class SignIn extends Component {
    
    login = (values) =>{

        this.props.signIn(values); 
    }

    componentDidMount() {
        this.props.authError;

    }

    render(){
        const { handleSubmit, authError, reset } = this.props;

        return (
            
        <div className="login">    
            <div className="logo-holder">            
                <img src={logo} />
                <h1>CONCERT BUDDY</h1>
                <h3>Plan Your Concert Trip</h3>
            </div>
            <form onSubmit={handleSubmit(this.login)}> 
                <div className="inputs">
                    <Field name="email" component={Input} className="standard-input" placeholder="Enter Your Email" label="Email"/>
                    <Field name="password" type="password" className="standard-input" placeholder="Enter Your Password" component={Input} label="Password"/>
                    <div className="response">
                    </div>
                </div>              
                <div className="buttons">
                    <button className="pink-btn" onClick={reset}>LOGIN</button>
                    <p>{authError}</p>
                </div>
            </form>
            <div className="buttons">
                <div className="a-tag"> <Link to="/sign-up">SIGN UP!</Link></div>
            </div>
        </div>    
        )
    }
}

function validate(values){
    const { email,  password } = values;
    const errors = {};

    if(!email) errors.email = 'Please enter your email address';
    
    if(!password) errors.password = 'Please choose a password'; 

    return errors;
}

SignIn = reduxForm({
    form: 'sign-in',
    validate: validate      
})(SignIn);

function mapStateToProps(state){
    return {
        authError: state.userAuth.error
    }
}

export default connect( mapStateToProps, { signIn } )(SignIn);