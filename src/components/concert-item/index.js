import React from 'react';
import { Link } from 'react-router-dom';

const ConcertItem = (props) => {
    function convertDateFormat(yyddmm) {
        var newDate = yyddmm.split('-');
        var returnDate = (newDate[1]) + '-' + newDate[2] + '-' + newDate[0];
        return returnDate;
    }
    let formattedDate = convertDateFormat(props.date);

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
                        <span>{formattedDate}</span>
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
                <Link to={`/concert-details${props.queryString}&id=${props.id}`}><div className=" btn white-btn" >DETAILS</div></Link>

            </div>
            <div className='hr'><hr /></div>
        </div >
    );
}

export default ConcertItem;