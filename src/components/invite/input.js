import React from 'react';

export default (props) => {
    const {label, input, type, meta: { touched, error } } = props; 
    return (
        <div>
            <label>{label}</label>
            <input className="invite-emails" placeholder="Enter email address" autoComplete="off" className="standard-input" {...input} type={ type || 'text' } />
            <p>{touched && error}</p>
        </div>
    )
}