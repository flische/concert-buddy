import React, { Component } from 'react';
import './edit-responsibility.css';
import axios from 'axios';
import { formatPostData } from '../../helpers';
import { connect } from 'react-redux';

class EditResponsibility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                details: '',
                name: '',

                trip_id: this.props.trip_info.trip_id,
                ID: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { form } = this.state;
        this.setState({ form: { ...form, [name]: value } });
    }

    componentDidMount() {
        this.parseParameters();
    }

    parseParameters() {
        var queryObject = {};
        var pair = null;
        var sPageURL = window.location.search.substring(1),
            qArr = sPageURL.split('&');

        for (var i = 0; i < qArr.length; i++) {

            pair = qArr[i].split('=');
            queryObject[pair[0]] = pair[1];
        };
        console.log('query object: ', queryObject);
        this.getEditFields(queryObject);
    }

    async getEditFields(object) {
        const dataToSend = {
            edit_id: object.edit_id,
            trip_id: this.props.trip_info.trip_id
        }
        console.log('data to send: ', dataToSend);
        const params = formatPostData(dataToSend);
        const resp = await axios.post('api/get_edit_fields.php', params);
        console.log('resp for get edit fields: ', resp);

        this.setState({
            form: {
                title: resp.data.data[0].title,
                details: resp.data.data[0].details,
                name: resp.data.data[0].name,

                ID: resp.data.data[0].ID,
                trip_id: this.props.trip_info.trip_id,

            }
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();

        this.submitChanges();

    }

    async submitChanges() {
        const dataToSend = {
            title: this.state.form.title,
            details: this.state.form.details,
            name: this.state.form.name,
            trip_id: this.props.trip_info.trip_id,
            ID: this.state.form.ID
        }

        const params = formatPostData(dataToSend);
        const resp = await axios.post('api/edit_responsibilities.php', params);
        console.log('resp for get submit edit: ', resp);
        const newState = {
            form: {
                title: '',
                details: '',
                name: '',
                ID: '',
                trip_id: this.props.trip_info.trip_id,

            }
        }
        this.setState(newState);
        this.props.history.push('/responsibilities');
    }
    render() {
        const { title, details, name, } = this.state.form;
        return (
            <div>
                <div className="title">EDIT RESPONSIBILITY</div>
                <div className="add-resp-form">
                    <form onSubmit={(event) => { this.handleFormSubmit(event) }}>
                        <div className="inputs">
                            <div><label>Responsibility</label></div>
                            <input className="standard-input" type="text" name="title" value={title} placeholder="Responsibility" onChange={this.handleChange} />
                            <div>
                                <label>Person Responsible</label>
                            </div>
                            <input className="standard-input" type="text" name="name" value={name} placeholder="Person Responsible" onChange={this.handleChange} />
                        </div>
                        <textarea className="standard-textarea" name="details" rows="10" value={details} placeholder="Add Details" onChange={this.handleChange}></textarea>
                        <div className="buttons"><button className="pink-btn">SUBMIT CHANGES</button></div>

                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        trip_info: state.user.details
    }
}

export default connect(mapStateToProps)(EditResponsibility);