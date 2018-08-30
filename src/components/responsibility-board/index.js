import React, { Component } from 'react';
import './responsibility-board.css'
import { Link } from 'react-router-dom';
import './dummy-responsibilities';

class Responsibilities extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            completed: false
        };


    }
    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    itemCompleted() {
        this.setState({
            completed: !this.state.completed
        });
    }

    render() {
        return (
            <div>
                <div className="title">RESPONSIBILITIES</div>
                <div className="bottom-content">
                    <div className={"responsibilities" + (this.state.completed ? ' completed' : '')}>
                        <div className="x">&times;</div>
                        {this.state.completed ? <p><s>BOOK HOTEL ROOM</s></p> : <p>BOOK HOTEL ROOM</p>}

                        <p>Assigned to:<span><b>Howard</b></span></p>

                        <div>
                            <button className="toggle-btn" onClick={this.toggle.bind(this)}>DETAILS</button>

                            <div className={"collapse" + (this.state.open ? ' in' : '')}>
                                <div>Book 4 queen rooms at the Hyatt for June 10-15th</div>
                            </div>
                        </div>

                        <div className="mark-complete-btn pink-btn" onClick={this.itemCompleted.bind(this)}>MARK COMPLETE</div>

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