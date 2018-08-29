import React, {Component} from 'react';

export default (props) => {
    const {label, input,  meta: {touched, error}} = props;
    return (
        <div>
            <label>{label}</label>
            <input className="standard-input" {...input} type="text" />
        </div>
    )
}