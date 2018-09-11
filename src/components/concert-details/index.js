import React, { Component } from 'react';
import './concert-details.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get_concert_details } from '../../actions';
import { get_user_details} from '../../actions';
import Loader from '../loader';
import Modal from '../modal';


class ConcertDetails extends Component {
    state = {
        show: false
    }
    showModal = () => {
        this.setState({
            show: true
        })
    }
    hideModal = () => {
        this.setState({
            show: false
        })
    }
    componentDidMount() {
        this.props.get_user_details();
        this.parseParameters();
    }

    parseParameters() {
        var queryObject = {};
        var pair = null;
        localStorage.setItem('url', window.location.search.substring());
        var sPageURL = window.location.search.substring(1),
            qArr = sPageURL.split('&');

        for (var i = 0; i < qArr.length; i++) {

            pair = qArr[i].split('=');
            queryObject[pair[0]] = pair[1];
        };
        this.props.get_concert_details(queryObject);
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

    convertDateFormat = (yyddmm) => {
        var newDate = yyddmm.split('-');
        var returnDate = (newDate[1]) + '-' + newDate[2] + '-' + newDate[0];
        return returnDate;
    }




    render() {
        console.log('props in details', this.props);

        const concert = this.props.concert;
     
        if (concert._embedded === undefined) {
            return (
                <Loader />
            );
        }
        const cityState = concert._embedded.venues[0].city.name + ', ' + concert._embedded.venues[0].state.stateCode;
        let eventTime = this.convertTime(concert.dates.start.localTime);
        let convertedDate = this.convertDateFormat(concert.dates.start.localDate);
        console.log(this.props.user_concert);
        return (
            <div className="details div-container">

                <div className="title">
                    CONCERT DETAILS
                    </div>
                <img src={concert._embedded.attractions[0].images[3].url} />


                <div className="concert-details-main ">
                    <div className="concert-details-a ">
                        <p>
                            <b>Concert: </b>
                            <span>{concert.name}</span>
                        </p>
                        <p>
                            <b>Venue: </b>
                            <span>{concert._embedded.venues[0].name}</span>
                        </p>
                    </div>
                    <div className="concert-details-b ">
                        <p>
                            <b>Address: </b>
                            <span>{concert._embedded.venues[0].address.line1}</span>
                        </p>
                        <p>
                            <b>City, State: </b>
                            <span>{cityState}</span>

                        </p>
                    </div>
                    <div className="concert-details-c ">

                        <p>
                            <b>Date: </b>
                            <span>{convertedDate}</span>
                        </p>
                        <p>
                            <b>Time: </b>
                            <span>{eventTime}</span>
                        </p>
                    </div>
                </div>
                <div className="buttons">

                    <a href={concert.url} target='_blank'><div className=" btn white-btn">BUY TICKETS</div></a>


        {this.props.auth ? (this.props.user_concert.data === null ? <Link to='/new-trip-1'><div className="btn pink-btn">CREATE A TRIP</div></Link> : <button className="btn pink-btn" onClick={this.showModal}>CREATE A TRIP</button>) : <button className="btn pink-btn" onClick={this.showModal}>CREATE A TRIP</button>}



                    <Link to={`/concert-results/${this.props.location.search}`}><div className=" btn white-btn">BACK TO RESULTS</div></Link>

                </div>
                { this.props.auth ? <Modal show={this.state.show} handleClose={this.hideModal} >
                <p className="modal-p">You already have a current trip! Check it out in the planner!</p>
                <Link to="/planner"><div className="btn black-btn">Planner</div></Link>
                </Modal>  : 
                <Modal show={this.state.show} handleClose={this.hideModal} >
                <p className="modal-p">Please log in or sign up to create a trip</p>
                <Link to="/sign-in"><div className="btn black-btn">SIGN IN</div></Link>
                </Modal>  }
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        concert: state.concertDetails.concert,
        user_concert: state.user.details,
        auth: state.userAuth.auth
    }
}

export default connect(mapStateToProps, { get_concert_details, get_user_details})(ConcertDetails);