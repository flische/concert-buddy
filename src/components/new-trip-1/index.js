import React, { Component } from 'react';
import './new-trip-1.css'

class NewTrip1 extends Component {
    render() {
        return (
            <div className="newtrip">
                <div className="title">
                    CREATE A NEW TRIP
                    </div>
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
                        <b>Address: </b>
                        <span>2695 E Katella Ave</span>
                    </p>
                    <p>
                        <b>City, State: </b>
                        <span>Anaheim, CA 92806</span>
                    </p>

                    <p>
                        <b>Date: </b>
                        <span>May 20, 2019</span>
                    </p>
                    <p>
                        <b>Time: </b>
                        <span>7:00PM</span>
                    </p>
                </div>
                <div className="tripname">
                    <input type="text" className="standard-input" placeholder="Name Your Trip" />
                </div>
                <div className="buttons">

                    <button className="pink-btn">CREATE YOUR TRIP!</button>

                </div>
            </div>

        );
    }
}

export default NewTrip1;
