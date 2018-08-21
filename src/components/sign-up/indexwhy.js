import React, { Component } from 'react';
import './sign-up.css';

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
                matching: true,

            }
        }
    }
    componentDidUpdate() {
       

    }
    handleChange(event) {
        const { name, value } = event.target;
        const { form } = this.state;
        this.setState({ form: {...form, [name]: value } });
     
      
    }

    async handleFormSubmit(event) {
        event.preventDefault();
          const {email, name, password, passwordCheck} = this.state.form;
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
          console.log(dataToSend);
            
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
                    <form onSubmit={(event) => { this.handleFormSubmit(event) } }>
                        <div className="signup-inputs">
                            <input type="text" className="standard-input" placeholder="Enter Email Address" name="email" value={email} onChange={this.handleChange}/>
                            <input type="text" className="standard-input" placeholder="Enter Your Name"  name="name" value={name} onChange={this.handleChange}/>
                        </div>
                        <div className="signup-inputs">
                            <input type="text" style={this.state.form.matching ? correctStyle : incorrectStyle} className="standard-input" placeholder="Choose Password" name ="password" value={password} onChange={this.handleChange} />
                            <input type="text" className="standard-input" placeholder="Confirm Password" name ="passwordCheck" value={passwordCheck} onChange={this.handleChange}/>
                        </div>
                            <p style={this.state.from.matching ? "display: none ": "display: block"}>  Invalid Login </p>
                        <div className="buttons"><button className="pink-btn" >SIGN UP!</button></div>
                    </form>
                </div>
            </div>
           
        );
    }
}

export default SignUp;