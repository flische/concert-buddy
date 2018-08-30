import React, {Component} from 'react';

export default (props) => {
    const {label, input,  meta: {touched, error}} = props;
    return (
        <div>
            <input placeholder="Enter email address" autoComplete="off" className="standard-input" {...input} type="text" />
        </div>
    )
}