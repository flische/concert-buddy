import React, { Component } from 'react';
import './invite.css';


class InviteFriends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email1: '',
                email2: '',
                email3: '',
                email4: '',
                email5: '',
                email6: ''
            },
            // valid: {
            //     green: 'green',
            //     red: 'red'
            // }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { form } = this.state;
        console.log(value);
        this.setState({ form: { ...form, [name]: value } });
    }
    handleFormSubmit(event) {
        event.preventDefault();
        console.log('Called handleFormSubmit: ', this.state.form);

        const newState = {
            form: {
                email1: '',
                email2: '',
                email3: '',
                email4: '',
                email5: '',
                email6: ''
            }
        }
        this.setState(newState);
    }

    render() {
        const { email1, email2, email3, email4, email5, email6 } = this.state.form;
        return (
            <div>
                <div className="title">INVITE FRIENDS</div>
                <div className="invite-friends">
                    <form onSubmit={(event) => { this.handleFormSubmit(event) }}>
                        <div className="invite-emails">
                            <div className="email-container">
                                <input type="text" className="standard-input" placeholder="Enter Email Address" name="email1" value={email1} onChange={this.handleChange} />
                                <input type="text" className="standard-input" placeholder="Enter Email Address" name="email2" value={email2} onChange={this.handleChange} />
                                <input type="text" className="standard-input" placeholder="Enter Email Address" name="email3" value={email3} onChange={this.handleChange} />
                            </div>
                            <div className="email-container">
                                <input type="text" className="standard-input" placeholder="Enter Email Address" name="email4" value={email4} onChange={this.handleChange} />
                                <input type="text" className="standard-input" placeholder="Enter Email Address" name="email5" value={email5} onChange={this.handleChange} />
                                <input type="text" className="standard-input" placeholder="Enter Email Address" name="email6" value={email6} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="buttons">
                            <button className="pink-btn">INVITE FRIENDS</button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default InviteFriends;