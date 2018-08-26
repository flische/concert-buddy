import React from 'react';
import { Link } from 'react-router-dom';
import './404.css'
import image from './404.jpg'
export default () => {
    const center = {
        color: 'lightblue'
    }
    return (
        <div>
            <div className ="center">
                <img className="img404" src={image} /><br/>
                <Link style={center} to ="/">Return To Home Page </Link>
            </div>
        </div>
    )
}