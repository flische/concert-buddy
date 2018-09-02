import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import Input from './input';

class SignIn extends Component {
    
    login = (values) =>{
        console.log('Login Values:', values);

        this.props.signIn(values); //<-- making a real call to the server and making a real acct for you!
    }

    render(){
        const { handleSubmit, authError } = this.props;

        return (
            
        <div>    
            <h1 className="center">Sign In</h1>
            <form onSubmit={handleSubmit(this.login)}> 
                <div className="row">
                    <Field className="col-6 offset-3" name="email" component={Input} label="Email"/>
                </div>
                <div className="row">
                    <Field type="password" className="col-6 offset-3" name="password" component={Input} label="Password"/>
                </div>
                <div className="row">
                    <div className="d-flex col-6 offset-3 justify-content-end">
                        <button className="btn blue darken-2">Sign In</button>
                        <p className="red-text">{authError}</p>
                    </div>
                </div>
            </form>
        </div>    
        )
    }
}

function validate(values){
    const { email,  password } = values;
    const errors = {};

    if(!email) errors.email = 'Please enter your email address';
    
    if(!password) errors.password = 'Please choose a password'; // <-- if statement on 1 line! 

    return errors;
}

SignIn = reduxForm({
    form: 'sign-in',
    validate       // <-- same thing as line below! since it's the same name!
    // validate: validate
})(SignIn);

function mapStateToProps(state){
    return {
        authError: state.user.error
    }
}

export default connect( mapStateToProps, { signIn } )(SignIn);