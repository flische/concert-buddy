import React, { Component } from 'react';
import './invite.css';
import { reduxForm, Field, FieldArray } from 'redux-form';
import InviteInput from './invite_input';
import { connect } from 'react-redux';
import { send_email_invites } from '../../actions'
import Modal from '../modal';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { formatPostData } from '../../helpers';
import RespModal from '../modal/modal';
import { get_user_details } from '../../actions';


class InviteFriends extends Component {
    state = {
        show: false,
        noTrip: false
    }

    showModal = () => {
        this.props.reset();
        this.setState({
            show: true
        });

        var elem = document.getElementById('body');
        elem.classList.add('remove-overflow');
    }

    hideModal = () => {
        this.setState({
            show: false
        })

        var elem = document.getElementById('body');
        elem.classList.remove('remove-overflow');
    }

    async componentDidMount() {
        window.scrollTo(0, 0);

        const config = {
            action: 'existing_login',
        }
        const params = formatPostData(config);
        const resp = await axios.post('api/handle_login.php', params);
        if (!resp.data.success) {
            this.props.history.push('/');
        } else {
            await this.props.get_user_details();
            if (!this.props.user_concert.trip_id) {
                this.setState({
                    noTrip: true
                });
            }

        }
    }

    renderEmails(props) {
        const { fields } = props;
        const emails = fields.map((name, index) => {
            if (index < 6) {
                return (
                    <Field key={name} name={name} component={InviteInput} />
                )
            } else {
                return;
            }
        });
        return (
            <div className="invite-emails">
                {emails}
                <div className="invite-emails" title="Add Recipient" onClick={() => { fields.push() }}>
                    <button type="button" className="white-btn">ADD MORE</button>
                </div>
                <div className="invite-emails" title="Add Recipient" onClick={() => { if (fields.length > 1) { fields.pop() } }}>
                    <button type="button" className="pink-btn">DELETE</button>
                </div>
            </div>
        );
    }

    inviteFriends(values) {
        const array = values.emails;

        for (let i = 0; i < array.length; i++) {

            if (array[i] !== undefined && array[i] !== "") {
                this.showModal();
            } else if (array.length > 1 && array[i] === undefined) {
                array.splice(i, 1);
                array[i] = "";
            }
        }
        this.props.send_email_invites(array);
    }

    render() {
        const { handleSubmit } = this.props;

        const pStyle = {
            color: 'dodgerblue',
            fontSize: '32px',
            textAlign: 'center'
        };

        return (
            <div className="invite-container">
                <form onSubmit={handleSubmit(this.inviteFriends.bind(this))}>
                    <h2 className="invite-friends">INVITE FRIENDS</h2>
                    <FieldArray name="emails" component={this.renderEmails} />
                    <div style={{ textAlign: 'center' }}>
                        <button className="white-btn">SEND INVITE</button>
                    </div>
                </form>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p className="modal-p">Invitations Sent!</p>
                    <div className="buttons">
                        <Link to="/planner"><div className="btn black-btn">GO TO PLANNER</div></Link>
                    </div>
                </Modal>
                <RespModal show={this.state.noTrip}>
                    <div className="modalFont">You currently do not have any trips planned. Please create a trip first!</div>
                </RespModal>
            </div>
        );
    }
}

function validate(values) {
    const { emails } = values;
    const errors = {};
    const emailErrors = [];

    if (!emails[0]) {
        emailErrors.push('Please enter at least one email.')
    }
    for (var index = 0; index < emails.length; index++) {
        if (!emails[index]) {
            emailErrors[index] = 'Please enter a email.';
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test((emails[index]))) {
            emailErrors[index] = 'Please enter a valid email address';
        }
        if (emailErrors.length) {
            errors.emails = emailErrors
        }
    }
    return errors;
}

InviteFriends = reduxForm({
    form: 'invite-friends',
    validate,
    enableReinitialize: true
})(InviteFriends);

function mapStateToProps(state) {
    return {
        user_concert: state.user.details,

        initialValues: {
            emails: ['']
        }
    }
}

export default connect(mapStateToProps, { send_email_invites, get_user_details })(InviteFriends)


