import React, { Component } from 'react';
import './sign-up.css';
import { formatPostData } from '../../helpers';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            form: {
                email: '',
                name: '',
                password: '',
                passwordCheck: '',
                matching: 'null',

            },
            redirect: false,
        }
    }
    componentDidUpdate() {
       

    }
    handleChange(event) {
        const { name, value } = event.target;
        const { form } = this.state;
        const { password, passwordCheck } = this.state.form; 
        this.setState({
            form: {...form, [name]: value}
       
            
        });
        // this.checkMatching();
    }
    // checkMatching() { 
    //     const { form } = this.state;
    //     const { password, passwordCheck } = this.state.form; 
    //     if (passwordCheck === password) {
    //         this.setState({
    //            form: {...form, 
    //             matching: true }});
    //     }
    //     else {
    //         this.setState({ 
    //             form: {...form, 
    //                 matching: false }});
    //     }
     
      
    // }
    renderRedirect() {
        if (this.state.redirect) {
        return <Redirect to='/login' />
    }
}
    async handleFormSubmit(event) {
        event.preventDefault();
          const {email, name, password, passwordCheck} = this.state.form;
          if (password !== passwordCheck) {
            this.setState({
                form: {
                    matching: false,
                },
                redirect: false
            });
        }
        else {
          const dataToSend = {
              email: email,
              name: name,
              password, password, 
          }
       const params = formatPostData(dataToSend);
           const resp = await axios.post('api/addUser.php', params);
            if (resp.data.success) {
                console.log("here")
                this.setState({
                    redirect: true,
                });
            }
        }
    }
    render() {
        const {email, name, password, passwordCheck, matching} = this.state.form;
        const correctStyle = {
            "border" : "2px green solid"
        }
        const incorrectStyle = {
            "border" : "2px red solid"
        }
        return (
            <div>
                {this.renderRedirect()}
                <div className="title">SIGN UP FOR <br />CONCERT BUDDY</div>

                <div className="signup">
                    <form id="signupForm" onSubmit={(event) => { this.handleFormSubmit(event) } }>
                        <div className="signup-inputs">
                            <input type="text" className="standard-input" placeholder="Enter Email Address" name="email" value={email} onChange={this.handleChange}/>
                            <input type="text" className="standard-input" placeholder="Enter Your Name"  name="name" value={name} onChange={this.handleChange}/>
                        </div>
                        <div className="signup-inputs">
                            <input type="text" style={this.state.form.matching ? correctStyle : incorrectStyle} className="standard-input" placeholder="Choose Password" name ="password" value={password} onChange={this.handleChange} />
                            <input type="text" style={this.state.form.matching ? correctStyle : incorrectStyle} className="standard-input" placeholder="Confirm Password" name ="passwordCheck" value={passwordCheck} onChange={this.handleChange}/>
                        </div>
                            <p className={this.state.form.matching ? 'hidden': 'show'}>  Passwords Are not Matching! </p>
                        <div className="buttons"><button className="pink-btn" >SIGN UP!</button></div>
                    </form>
                </div>
            </div>
           
        );
    }
}

export default SignUp;