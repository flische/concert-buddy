import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user_details } from '../../actions';
import './planner.css';
import axios from 'axios';
import { formatPostData } from '../../helpers';
import { Link } from 'react-router-dom';
import Loader from '../loader';

class Planner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            concerts: null,
        }
    }
    
    
    componentDidMount() {
        this.checkUserTrips();
    }

    async checkUserTrips() {
        await this.props.get_user_details();
        this.setState({
            concerts: this.props.user_concert,
        })

    }

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

    render() {
        const concertImage = this.props.user_concert.img;

        const user_concert = this.props.user_concert;
        if (Object.getOwnPropertyNames(user_concert).length === 0) {
          
            return (
                <Loader />
            );
        }
        if (this.state.concerts === null) {
            return (
                <Loader />
            );
        }
        const arrayOfPeopleGoing = this.props.users_attending;

        let eventTime = this.convertTime(user_concert.time);
        if (arrayOfPeopleGoing) {

            var evenArray = [];
            var oddArray = [];
            for (let i = 0; i < arrayOfPeopleGoing.length; i++) {

                if (i % 2 === 0) {
                    evenArray.push(<div key={arrayOfPeopleGoing[i]}>{arrayOfPeopleGoing[i]}</div>)
                } else {
                    oddArray.push(<div key={arrayOfPeopleGoing[i]}>{arrayOfPeopleGoing[i]}</div>)
                }
            }
        }

        if (user_concert.data ===  null) {

            return (
                <div className="div-container">
                    <div className="title">PLANNED TRIP</div>
                    <div className="no-resp-main">
                        <div>
                            <div className="no-resp">You do not have any trips planned. Please create an event.</div>
                            <Link to="/search-concerts"><div className="btn pink-btn">SEARCH CONCERTS</div></Link>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.user_concert === null) {
            return (
                <Loader />
            );
        }

        return (
            <div className="bottom-content div-container">
                <div className="title">
                    <h1> {user_concert.trip_name}</h1>
                </div>
                <div className="imageArea">
                    <img src={concertImage} />
                </div>
                <div className="concert-overview">
                    <div>
                        <h3>Event: <b>{user_concert.artist}</b></h3>
                    </div>
                    <div>
                        <h3>Date: <b>{user_concert.date} @ {eventTime}</b></h3>
                    </div>
                    <div>
                        <h3>Location: <b>{user_concert.address + ''}</b></h3>
                    </div>
                </div>
                <div className="title">WHO'S GOING?</div>
                <div className="attendees">
                    <div className="leftSide">
                        {evenArray}
                    </div>
                    <div className="rightSide">
                        {oddArray}
                    </div>
                </div>
                <div className="buttons">
                    <Link to="/responsibilities"><div className="btn pink-btn">RESPONSIBILITIES</div></Link>
                    <Link to="/invite"><div className="btn white-btn">INVITE FRIENDS</div></Link>
                </div>
            </div>
        );
    }
 }

function mapStateToProps(state) {
    return {
        user_concert: state.user.details,
        users_attending: state.user.going
    };
}

export default connect(mapStateToProps, { get_user_details: get_user_details })(Planner);