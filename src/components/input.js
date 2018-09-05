import React from 'react';

export default ( {input, label, type, meta: { touched, error }} ) => (
        <div>
            <div><label>{label}:</label></div>
            <input {...input} className="standard-input" autoComplete="off" type={ type || 'text' } placeholder={`Please enter ${label} here`}/>
            <p>{ touched && error }</p>
        </div>
);