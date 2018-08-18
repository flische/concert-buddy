import React, { Component } from 'react';
import './sign-up.css';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {

            }
        }
    }

    render() {
        return (
            <div>
                <div className="title">SIGN UP FOR <br />CONCERT BUDDY</div>

                <div className="signup">
                    <form>
                        <div className="signup-inputs">
                            <input type="text" className="standard-input" placeholder="Enter Email Address" />
                            <input type="text" className="standard-input" placeholder="Enter Your Name" />
                        </div>
                        <div className="signup-inputs">
                            <input type="text" className="standard-input" placeholder="Choose Password" />
                            <input type="text" className="standard-input" placeholder="Confirm Password" />
                        </div>
                        <div className="buttons"><button className="pink-btn ">SIGN UP!</button></div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;