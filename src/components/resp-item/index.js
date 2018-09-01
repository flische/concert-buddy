import React from 'react';
import './resp-item.css';
import { Link } from 'react-router-dom';

const RespItem = (props) => {
    return (
        <div className={"responsibilities" + (props.completed ? ' completed' : '')}>
            <div className="x">&times;</div>
            {props.completed ? <p><s>{props.title}</s></p> : <p>{props.title}</p>}

            <p>Assigned to:<span><b>{props.name}</b></span></p>

            <div>
                <button className="toggle-btn" onClick={props.toggle}>DETAILS</button>

                <div className={"collapse" + (props.open ? ' in' : '')}>
                    <div>{props.details}</div>
                </div>
            </div>

            <div className="mark-complete-btn pink-btn" onClick={props.itemCompleted}>MARK COMPLETE</div>
            <div className="edit">EDIT</div>

        </div>
    )
}

export default RespItem;