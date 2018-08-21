import React, { Component } from 'react';
import './sign-up.css';
import { formatPostData } from '../../helpers';
import axios from 'axios';

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
    async handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.state);
          const {email, name, password, passwordCheck} = this.state.form;
          console.log(password);
          console.log(passwordCheck);
          if (password !== passwordCheck) {
            this.setState({
                form: {
                    matching: false,
                }
            });
        }
        else {
          const dataToSend = {
              email: email,
              name: name,
              password, password, 
          }
       const params = formatPostData(dataToSend);
       console.log(dataToSend);
           const resp = await axios.post('api/addUser.php', params);
            console.log(resp);
            if (resp.data.success) {
                document.getElementById('signupForm').empty().text("Successfully Signed please sign in")
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