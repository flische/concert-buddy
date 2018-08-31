import React, { Component } from 'react';
import './add-responsibility.css';

class AddResponsibility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                person: '',
                details: ''
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
        // make call to database to add item to responsibilities table


        const newState = {
            form: {
                title: '',
                person: '',
                details: ''
            }
        }
        this.setState(newState);
        this.props.history.push('/responsibilities');
    }
    render() {
        console.log(this.state.form);
        const { title, person, details } = this.state.form;
        return (
            <div>
                <div className="title">RESPONSIBILITIES</div>
                <form onSubmit={(event) => { this.handleFormSubmit(event) }}>
                    <div className="resp-form">
                        <label className="label">Responsibility</label>
                        <input className="standard-input" type="text" name="title" value={title} placeholder="Responsibility" onChange={this.handleChange} />
                        <label className="label">Person Responsible</label>
                        <input className="standard-input" type="text" name="person" value={person} placeholder="Person Responsible" onChange={this.handleChange} />
                        <textarea className="standard-textarea" name="details" rows="10" value={details} placeholder="Add Details" onChange={this.handleChange}></textarea>
                        <div className="buttons"><button className="pink-btn">ADD</button></div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddResponsibility;