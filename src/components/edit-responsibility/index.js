import React, { Component } from 'react';
import './edit-responsibility.css';
import axios from 'axios';
import { formatPostData } from '../../helpers';
import { connect } from 'react-redux';
import Loader from '../loader';
import { Link } from 'react-router-dom';

class EditResponsibility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: null,
                details: null,
                name: null,
                trip_id: this.props.trip_info.trip_id,
                ID: null
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

        this.getEditFields(queryObject);
    }

    async getEditFields(object) {
        const dataToSend = {
            edit_id: object.edit_id,
            trip_id: this.props.trip_info.trip_id
        }
        const params = formatPostData(dataToSend);
        const resp = await axios.post('api/get_edit_fields.php', params);

        this.setState({
            form: {
                ID: resp.data.data[0].ID,
                title: resp.data.data[0].title,
                details: resp.data.data[0].details,
                name: resp.data.data[0].name,
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
            ID: this.state.form.ID,
            title: this.state.form.title,
            details: this.state.form.details,
            name: this.state.form.name,
            trip_id: this.props.trip_info.trip_id

        }

        const params = formatPostData(dataToSend);
        const resp = await axios.post('api/edit_responsibilities.php', params);
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
        if (this.state.form.title === null) {
            return (
                <Loader />
            )
        }

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
                    <div className="buttons"><Link to='/responsibilities'><div className=" btn white-btn">BACK</div></Link></div>

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