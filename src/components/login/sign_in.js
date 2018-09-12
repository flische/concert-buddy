import './login.css';
import logo from '../../assets/about_team_images//logo.png';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import Input from '../input';
import {formatPostData} from '../../helpers'; 
import axios from 'axios';
import {resetError} from '../../actions';


class SignIn extends Component {
    
    login = async (values) => {
       await this.props.signIn(values); 

        if(this.props.userAuth){
            if(window.localStorage.length > 0 ){
                if(window.localStorage.getItem("token")){
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
    }

    render(){
        const { handleSubmit, authError} = this.props;

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
                    <button className="pink-btn">LOGIN</button>
                    <p>{authError}</p>
                </div>
            </form>
            <div className="buttons">
                <div> <Link to="/sign-up"><button className="button white-btn"> SIGN UP!</button></Link></div>
            </div>
        </div>    
        );
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
        authError: state.userAuth.error,
        userAuth: state.userAuth.auth
    }
}

export default connect( mapStateToProps, { signIn, resetError } )(SignIn);