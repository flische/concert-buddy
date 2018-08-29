import React, { Component } from 'react';
import './invite.css';
import { reduxForm, Field, FieldArray } from 'redux-form';
import Input from './input';


class InviteFriends extends Component {
    renderEmails(props){
        const{fields} = props;
        console.log(fields);
        const emails = fields.map((name, index) => {
            return(
                <Field name={name} label={`Email ${index + 1}`} component={Input} />
            )
        })

        return (
            <div>
                {emails}
                <div type="button" className="add-email" title= "Add Recipient" onClick={()=>{fields.push()}}>
                    <button>Add</button>
                </div>
            </div>
        )
    }
    submitForm(values){
        console.log(values)    
    }
    render(){
        const{handleSubmit, reset} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submitForm)}>
                <h2>INVITE FRIENDS</h2>
                <FieldArray name="emails" component = {this.renderEmails} />
            </form>
        )
    }
}

export default reduxForm({
    form: 'invite-friends',
    initialValues: {
        emails: ['']
    }

})(InviteFriends);