import React from 'react';
import image from '../../images/concert.jpeg'
import './about.css';
import html from '../../images/html5.png';
import css from '../../images/css3.png';
import mysql from '../../images/mysql.png';
import php from '../../images/php.png';
import react from '../../images/react.png';
import redux2 from '../../images/redux2.png';


export default () => {
    const imageArray = [html, css, mysql, php, react, redux2];
    const iconStyle = {
        width: '26%',
        height: '26%',
        marginTop: '3%'
    }
    const reduxStyle = {
        width: '26%',
        height: '26%'
    }
    const images = imageArray.map((item, index)=>{
        if(index === (imageArray.length-1)){
            return (
                <img key={item} style={reduxStyle} src={item}/>
            )
        } else {
            return (
                <img key={item} style={iconStyle} src={item} />
            )
        }

    })

    const imageStyle = {
        width: '90%',
        border: '5px solid white'
    }
    return (
        <div className="container">
        <h2>ABOUT CONCERT BUDDY</h2>
            <div className="imageContainer">
                <img style={imageStyle} src={image} />
            </div>
            <div className="description">
                <p>Concert Buddy was designed with one purpose in mind - to streamline the process of planning trips with friends through accountability and transparency.</p>
            </div>
            <h2>TECHNOLOGIES USED</h2>
            <div className="techSection">
                {images}
            </div>
        </div>
    )
}