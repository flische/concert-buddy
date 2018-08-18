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
                    <div>
                        <h2>Concert: Taylor Swift</h2>
                    </div>
                    <div>
                        <h2>Date: May, 24, 2019</h2>
                    </div>
                    <div>
                        <h2>Location: Anaheim, CA</h2>
                    </div>
                </div>
                <div className="title">WHO'S GOING?</div>
                <div className="attendees">
                    <div className="leftSide">
                        <h2>TIEN</h2>
                        <h2>FEDERICO</h2>
                    </div>
                    <div className="rightSide">
                        <h2>REBECCA</h2>
                        <h2>HOWARD</h2>
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