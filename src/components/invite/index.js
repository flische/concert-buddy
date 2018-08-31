import React, { Component } from 'react';
import './invite.css';
import { reduxForm, Field, FieldArray } from 'redux-form';
import Input from './input';
import {connect} from 'react-redux';
import {send_email_invites} from '../../actions'


class InviteFriends extends Component {
    renderEmails(props){
        const{fields} = props;
        const emails = fields.map((name, index) => {
            if(index < 6){
            return(
                <Field key ={name} name={name} component={Input} />
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
        for(var i = 0; i < array.length; i++){
            if(array[i] === undefined){
                array.splice(i, 1);
                console.log(array);
            } 
        }
    
        this.props.send_email_invites(array);
    }
    render(){
        const{handleSubmit, reset} = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.inviteFriends.bind(this))}>
                    <h2 className="invite-friends">INVITE FRIENDS</h2>
                    <FieldArray name="emails" component = {this.renderEmails} />
                    <div style={{textAlign: 'center'}}>
                        <button className="white-btn">SEND INVITE</button>
                    </div>
                </form>
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

