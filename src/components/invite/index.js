import React, { Component } from 'react';
import './invite.css';
import { reduxForm, Field, FieldArray } from 'redux-form';
import InviteInput from './invite_input';
import {connect} from 'react-redux';
import {send_email_invites} from '../../actions'
import Modal from '../confirmation-modal';

class InviteFriends extends Component {
    
    state = {
        show: false
    }
    showModal = () => {
        this.setState({
            show: true
        })
    }
    hideModal = () => {
        this.setState({
            show: false
        })
    }
    renderEmails(props){
        const{fields} = props;
        const emails = fields.map((name, index) => {
            if(index < 6){
            return(
                <Field key ={name} name={name} component={InviteInput} />
            )
        } else {
            return;
        }
        })
        return (
            <div className="invite-emails">
                {emails}
                <div className="invite-emails" title="Add Recipient" onClick={()=>{fields.push()}}>
                    <button type="button" className="pink-btn">ADD MORE</button>
                </div>
            </div>
        )
    }
    inviteFriends(values){
        const array = values.emails; 
        console.log(array);
        for(let i = 0; i < array.length; i++){
            if(array[i] !== undefined && array[i] !== ""){
                this.showModal();
                array[i] = "";
            } else if(array.length > 1 && array[i] === undefined) {
                array.splice(i, 1);
                array[i] = "";

            }
        }
        console.log(array);
        this.props.send_email_invites(array);
    }
    render(){

        const{handleSubmit, reset} = this.props;
        const pStyle = {
            color: 'dodgerblue',
            fontSize: '32px',
            textAlign: 'center'
        }

        return (
            <div>
                <form onSubmit={handleSubmit(this.inviteFriends.bind(this))}>
                    <h2 className="invite-friends">INVITE FRIENDS</h2>
                    <FieldArray name="emails" component = {this.renderEmails} />
                    <div style={{textAlign: 'center'}}>
                        <button className="white-btn">SEND INVITE</button>
                    </div>
                </form>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p style={pStyle}>Invitations Sent!</p>
                </Modal>
            </div>
        )
    }
}

// if (!(/^@+$/.test(emails))) {
//     emailErrors.push('Please enter a valid email address')
// }
// if (emailErrors.length) {
//     errors.emails = emailErrors
// }

// function validate(values){
//     const {emails} = values; console.log(emails);
//     const errors = {};
//     const emailErrors = [];

// }

InviteFriends = reduxForm({
    form: 'invite-friends',
    // validate,
    initialValues: {
        emails: [''],
    }

})(InviteFriends);
export default connect(null, {send_email_invites})(InviteFriends)

