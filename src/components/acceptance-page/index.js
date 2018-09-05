import React, {Component} from 'react';
import './acceptance-page.css'
import {Link} from 'react-router-dom';

class AcceptancePage extends Component{
    render(){
        return (
            <div className="container">
                 <div className="detailsHeader title">
                    YOUR INVITED TRIP DETAILS: 
                    <div className="imageContainer">
                        <img src="https://www.rollingstone.com/wp-content/uploads/2018/09/eminem-kamikaze-review1.jpg?crop=900:600&width=440" alt="eminem"/>
                    </div>
                </div>
                <div className="concert-overview">
                    <div>
                        <h2>Concert: </h2>
                    </div>
                    <div>
                        <h2>Date: </h2>
                    </div>
                    <div>
                        <h2>Location: </h2>
                    </div>
                </div>
                <div className="title">WHO'S GOING?</div>
                <div className="attendees">
                    <div className="leftSide">
                        Tien
                    </div>
                    <div className="rightSide">
                        Rebecca
                    </div>
                </div>
                <div className="buttonArea">
                    <Link to ="/login"><div className="btn white-btn">ACCEPT</div></Link>
                    <div className="btn pink-btn">DECLINE</div>
                </div>
            </div>
        )
    }
}


export default AcceptancePage;