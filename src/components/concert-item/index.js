import React from 'react';
import { Link } from 'react-router-dom';

const ConcertItem = (props) => {

    return (

        <div className="concert-result-container">
            <div className="concert-results">
                <div className="concert-part-a">
                    <p>
                        <b>Concert: </b>
                        <span>{props.artist}</span>
                    </p>
                    <p>
                        <b>Date: </b>
                        <span>{props.date}</span>
                    </p>
                </div>
                <div className="concert-part-b">
                    <p>
                        <b>Venue: </b>
                        <span>{props.venue}</span>
                    </p>
                    <p>
                        <b>Location: </b>
                        <span>{props.city} , {props.state}</span>
                    </p>
                </div>
            </div>
            <div className="buttons">
                <Link to={`/concert-details/?id=${props.id}`}><button className="white-btn" >DETAILS</button></Link>

            </div>
            <div className='hr'><hr /></div>
        </div >
    );
}

export default ConcertItem;