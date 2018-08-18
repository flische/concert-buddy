import React, { Component } from 'react';
import './concert-details.css'
import swift from '../../images/taylor-swift.jpg';

class ConcertDetails extends Component {
    render() {
        return (
            <div className="details">

                <div className="title">
                    CONCERT DETAILS
                    </div>
                <img src={swift} />


                <div className="concert-details-main ">
                    <div className="concert-details-a ">
                        <p>
                            <b>Concert: </b>
                            <span>Taylor Swift</span>
                        </p>
                        <p>
                            <b>Venue: </b>
                            <span>Honda Center</span>
                        </p>
                    </div>
                    <div className="concert-details-b ">
                        <p>
                            <b>Address: </b>
                            <span>2695 E Katella Ave</span>
                        </p>
                        <p>
                            <b>City, State: </b>
                            <span>Anaheim, CA 92806</span>
                        </p>
                    </div>
                    <div className="concert-details-c ">

                        <p>
                            <b>Date: </b>
                            <span>May 20, 2019</span>
                        </p>
                        <p>
                            <b>Time: </b>
                            <span>7:00PM</span>
                        </p>
                    </div>
                </div>
                <div className="buttons">
                    <button className="white-btn">BUY TICKETS</button>
                    <button className="pink-btn">ADD TO PLANNER</button>
                    <button className="white-btn">BACK TO RESULTS</button>
                </div>


            </div>

        );
    }
}

export default ConcertDetails;