import React, { Component } from 'react';
import './planner.css'


class Planner extends Component {
    render() {
        return (
            <div className="bottom-content">
                <div className="title">
                    HOWARD'S TRIP
            </div>


                <div className="concert-overview">
                    <p>
                        <b>Concert: </b>
                        <span>Taylor Swift</span>
                    </p>
                    <p>
                        <b>Date: </b>
                        <span>May 20, 2019</span>
                    </p>
                    <p>
                        <b>Location: </b>
                        <span>Anaheim, CA</span>
                    </p>
                </div>
                <div className="title">WHO'S GOING?</div>
                <div className="attendees">
                    <div>
                        <span>TIEN</span>
                        <span>REBECCA</span>
                        <span>FEDERICO</span>
                    </div>
                    <div>
                        <span>KEVIN</span>
                    </div>
                </div>


                <div className="buttons">
                    <button className="pink-btn">******</button>
                    <button className="white-btn">******</button>
                    <button className="pink-btn">******</button>
                </div>
            </div>
        );
    }
}

export default Planner;