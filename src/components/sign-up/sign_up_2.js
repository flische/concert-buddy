import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../actions';
import Input from './input';

class SignUp extends Component {
    
    register = (values) =>{
        console.log('Register Values:', values);

        this.props.signUp(values); //<-- making a real call to the server and making a real acct for you!
    }

    render(){
        const { handleSubmit } = this.props;

        return (
            <div>
                <div className="title">SIGN UP FOR <br/>CONCERT BUDDY</div>
                <div className="signup">
                    <form onSubmit={handleSubmit(this.register)}> 
                        <div className="signup-inputs">
                            <Field className="standard-input" name="email" component={Input} label="Email"/>
                        </div>
                        <div className="signup-inputs">
                            <Field type="password" className="standard-input" name="password" component={Input} label="Password"/>
                            <Field type="password" className="standard-input" name="confirmPassword" component={Input} label="Confirm Password"/>
                        </div>
                        <div className="buttons"><button className="pink-btn" >SIGN UP!</button></div>
                     </form>
                </div>
            </div>
        );
    }
}

function validate(values){
    const { email,  password, confirmPassword } = values;
    const errors = {};

    if(!email){
        errors.email = 'Please enter your email';
    }

    if(!password) errors.password = 'Please choose a password'; // <-- if statement on 1 line! 

    if(password !== confirmPassword){
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}

SignUp = reduxForm({
    form: 'sign-up',
    validate: validate
})(SignUp);

export default connect( null, { signUp } )(SignUp);