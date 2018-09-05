import React, { Component } from 'react';
import './login.css';
import logo from '../../images/logo.png';
import { Link, Redirect } from 'react-router-dom';
import { formatPostData } from '../../helpers';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            form: {
                email: '',
                password: ''
            },
            redirect: false,
        }

        this.handleChange = this.handleChange.bind(this);
    }


    async checkLoginStatus(initialCheck=false) { 
       const resp = await axios.post('api/checkUserLoggedIn.php');
       if (resp.data.success) {
        
           this.setState({redirect: true});
       }
    }
    
    componentDidMount() {
        this.checkLoginStatus(true);
    }

    renderRedirect() {
        if (this.state.redirect) {
        return <Redirect to='/planner' />
    }
}

    handleChange(event) {
        const { name, value } = event.target;
        const { form } = this.state;
        this.setState({ form: {...form, [name]: value } });
    }
    

    async handleFormSubmit(event) {
        event.preventDefault();
        const {email,password} = this.state.form;
        var dataToSend = {
            email: email,
            password: password,
        }
       
        const params = formatPostData(dataToSend)
    
        
        await axios.post('api/loginCheck.php', params);
                
        const newState = {
            form: {
                email: '',
                password: ''
            }
        }
        this.setState(newState);
        this.checkLoginStatus();
        this.renderRedirect();
    }
    render() {
        const { email, password } = this.state.form;
        return (
            <div className="login">
            {this.renderRedirect()}
                <div className="logo-holder">            
                    <img src={logo} />
                    <h1>CONCERT BUDDY</h1>
                    <h3>Plan Your Concert Trip</h3>
                </div>
                <form onSubmit={(event) => { this.handleFormSubmit(event) }}>
                    <div className="inputs">
                        <input className="standard-input" type="email" placeholder="Enter Your Email" name="email" value={email} onChange={this.handleChange} />
                        <input className="standard-input" type="password" placeholder="Enter Your Password" name="password" value={password} onChange={this.handleChange} />
                        <div className="response">

                        </div>
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