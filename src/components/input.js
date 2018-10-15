import React from 'react';

export default ({ input, label, type, placeholder, meta: { touched, error } }) => (
    <div>
        <div className="input-label"><label>{label}:</label></div>
        <input {...input} className="standard-input phone-sizing" autoComplete="off" type={type || 'text'} placeholder={placeholder || `Please enter ${label} `} />
        <p>{touched && error}</p>
    </div>
);