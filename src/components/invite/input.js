import React, {Component} from 'react';

export default (props) => {
    console.log('input props', props)
    const {label, input,  meta: {touched, error}} = props;
    console.log(error);
    return (
        <div className="invite-emails">
            <input className="invite-emails" placeholder="Enter email address" autoComplete="off" className="standard-input" {...input} type="text" />
            <p>{touched && error}</p>
        </div>
    )
}