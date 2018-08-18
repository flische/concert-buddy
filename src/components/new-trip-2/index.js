import React, { Component } from 'react';
import './new-trip-2.css';
import swift from '../../images/taylor-swift.jpg';
import { Link } from 'react-router-dom';

class NewTrip2 extends Component {
    render() {
        return (
            <div>
                <div className="newtrip-2">
                    <div className="title">
                        HOWARD'S TRIP
            </div>
                    <img src={swift} />
                    <div className="concert-info">
                        <p>
                            <b>Concert: </b>
                            <span>Taylor Swift</span>
                        </p>
                        <p>
                            <b>Venue: </b>
                            <span>Honda Center</span>
                        </p>
                        <p>
                            <b>Location: </b>
                            <span>Anaheim, CA 92806</span>
                        </p>
                    </div>
                    <div className="buttons">

                        <button className="pink-btn">plnr btn if loggedin</button>
                        <button className="white-btn">INVITE FRIENDS</button>
                        <button className="pink-btn">LOGIN</button>
                        <div className="a-tag"> <Link to="/sign-up">SIGN UP!</Link></div>
                    </div>
                </div>
                <div className="modal modalShadow showModal">
                    <div className="mainModal">
                        <div className="modalHeader">
                            <h1>HEY THERE!</h1>
                        </div>
                        <h3>We are so excited to help you plan your concert trip! Please login to invite your friends to join you on this
                            trip.
            </h3>
                        <div>
                            <button type="button" className="pink-btn" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>


            </div>
        );
    }

}

export default NewTrip2;