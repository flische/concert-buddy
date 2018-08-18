import React, { Component } from 'react';
import './login.css'
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: '',
                password: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { form } = this.state;
        this.setState({ form: { ...form, [name]: value } });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log('Called handleFormSubmit: ', this.state.form);

        const newState = {
            form: {
                email: '',
                password: ''
            }
        }
        this.setState(newState);

    }

    render() {
        const { email, password } = this.state.form;
        return (
            <div className="login">
                <div className="logo-holder">

                    <img src={logo} />


                    <h1>CONCERT BUDDY</h1>
                    <h3>Plan Your Concert Trip</h3>
                </div>
                <form onSubmit={(event) => { this.handleFormSubmit(event) }}>
                    <div className="inputs">
                        <input className="standard-input" type="email" placeholder="Enter Your Email" name="email" value={email} onChange={this.handleChange} />
                        <input className="standard-input" type="password" placeholder="Enter Your Password" name="password" value={password} onChange={this.handleChange} />
                    </div>
                    <div className="buttons">
                        <button className="pink-btn">LOGIN</button>
                    </div>
                </form>
                <div className="buttons">
                    <div className="a-tag"> <Link to="/sign-up">SIGN UP!</Link></div>
                </div>
            </div>
        );
    }
}

export default Login;