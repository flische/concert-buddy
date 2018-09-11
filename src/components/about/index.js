import React from 'react';
import image from '../../images/concert.jpeg'
import './about.css';
import html from '../../images/html5.png';
import css from '../../images/css3.png';
import mysql from '../../images/mysql.png';
import php from '../../images/php.png';
import react from '../../images/react.png';
import redux2 from '../../images/redux2.png';
import js from '../../images/javascript-logo.png';

export default () => {
    const imageArray = [html, js, css, react, php, mysql, redux2];
    const iconStyle = {
        width: '25%',
        height: '25%',
        marginTop: '3%'
    }
    const reduxStyle = {
        width: '28%',
        height: '28%'
    }
    const h2FontSize = {
        textAlign: 'center',
        fontFamily: 'Quicksand',
    }
    const pTagFontSize = {
        fontSize: '1.3em',
        fontFamily: 'Quicksand',
        textAlign: 'center'
    }
    const viewHeight = {
        height: '96vh'
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

    return (
        <div style={viewHeight} className="container">
        <h2 style={h2FontSize}>ABOUT CONCERT BUDDY</h2>
            <div className="imageContainer">
                <img src={image} />
            </div>
            <div className="description">
                <p style={pTagFontSize}>Concert Buddy was designed with one purpose in mind - to streamline the process of planning trips with friends through accountability and transparency.</p>
            </div>
            <h2 style={h2FontSize}>TECHNOLOGIES USED</h2>
            <div className="techSection">
                {images}
            </div>
        </div>
    )
}