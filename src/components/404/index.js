import React from 'react';
import { Link } from 'react-router-dom';
import './404.css'
import image from './404.jpg'
export default () => {
    const center = {
        color: 'lightblue'
    }
    const imageCSS = {
        width: '90%'
    }
    return (
        <div>
            <div className ="center">
                <img style={imageCSS} src={image} />
                <Link style={center} to ="/">Return To Home Page </Link>
            </div>
        </div>
    )
}