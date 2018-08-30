import React, { Component } from 'react';
import './responsibility-board.css'
import { Link } from 'react-router-dom';

class Responsibilities extends Component {
    render() {
        return (
            <div>
                <div className="title">RESPONSIBILITIES</div>

                <div className="bottom-content">
                    <div className="responsibilities">
                        <div className="x">&times;</div>
                        <p>BOOK HOTEL ROOM</p>
                        <p>Assigned to:<span><b>Howard</b></span></p>

                        <div className="mark-complete-btn pink-btn">MARK COMPLETE</div>

                    </div>
                    <div className="responsibilities completed">
                        <div className="x">&times;</div>
                        <p><s>BRING SNACKS</s></p>
                        <p><s>Assigned to:
                    <span>
                                <b>Rebecca</b>
                            </span>
                        </s> </p>
                        <div className="completed-btn white-btn">COMPLETED</div>

                    </div>

                </div>

                <div className="buttons">
                    <button className="pink-btn">ADD RESPONSIBILITY</button>
                    <button className="white-btn">GO TO PLANNER</button>

                </div>
            </div>

        );
    }
}

export default Responsibilities;