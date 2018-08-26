import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_concert_details } from '../../actions';
import './planner.css';


class Planner extends Component {

    convertTime = (militaryTime) => {
        if (!militaryTime) {
            return;
        }
        var time = militaryTime;
        time = time.split(':');
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var seconds = Number(time[2]);
        var timeValue;
        if (hours > 0 && hours <= 12) {
            timeValue = "" + hours;
        } else if (hours > 12) {
            timeValue = "" + (hours - 12);
        } else if (hours == 0) {
            timeValue = "12";
        }
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
        timeValue += (hours >= 12) ? " P.M." : " A.M.";
        return timeValue;
    }

    convertDateFormat = (yyddmm) => {
        var newDate = yyddmm.split('-');
        var returnDate = (newDate[1]) + '-' + newDate[2] + '-' + newDate[0];
        return returnDate;
    }

    render() {
        
        const concert = this.props.concert;

        if (concert._embedded === undefined) {
            return <h1>Loading...</h1>;
        }
        const cityState = concert._embedded.venues[0].city.name + ', ' + concert._embedded.venues[0].state.stateCode;
        let eventTime = this.convertTime(concert.dates.start.localTime);
        let convertedDate = this.convertDateFormat(concert.dates.start.localDate);
       
        return (
            <div className="bottom-content">
                <div className="title">
                    HOWARD'S TRIP
                </div>
                <div className="concert-overview">
                    <div>
                        <h2>Concert: {concert.name}</h2>
                    </div>
                    <div>
                        <h2>Date: {convertedDate} @ {eventTime}</h2>
                    </div>
                    <div>
                        <h2>Location: {concert._embedded.venues[0].address.line1 + ', ' + concert._embedded.venues[0].city.name + ''}</h2>
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

function mapStateToProps(state) {
    return {
        concert: state.concertDetails.concert
    }
}

export default connect(mapStateToProps, { get_concert_details: get_concert_details })(Planner);