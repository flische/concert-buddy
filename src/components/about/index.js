import React from 'react';
import image from '../../assets/about_team_images/concert.jpeg'
import './about.css';
import html from '../../assets/about_team_images/html5.png';
import css from '../../assets/about_team_images/css3.png';
import mysql from '../../assets/about_team_images/mysql.png';
import php from '../../assets/about_team_images/php.png';
import react from '../../assets/about_team_images/react.png';
import redux2 from '../../assets/about_team_images/redux2.png';
import js from '../../assets/about_team_images/javascript-logo.png';

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
        fontSize: '1.2em',
        fontFamily: 'Quicksand',
        textAlign: 'center',
        paddingLeft: '3%',
        paddingRight: '3%'
    }
    const viewHeight = {
        height: '35%'
    }
    const images = imageArray.map((item, index) => {
        if (index === (imageArray.length - 1)) {
            return (
                <img key={item} style={reduxStyle} src={item} />
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
            <div className="concert-image-container">
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