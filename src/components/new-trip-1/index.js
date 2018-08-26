import React, { Component } from 'react';
import './new-trip-1.css'
import './new-trip-1.css';
import axios from 'axios';
import  {formatPostData } from '../../helpers';
import { connect } from 'react-redux';
import {get_concert_details} from '../../actions';




class NewTrip1 extends Component {
  
    componentDidMount() {
        // this.parseParameters();
    }
    parseParameters() {
        var queryObject = {};
        var pair = null;
        var sPageURL = window.location.search.substring(1),
            qArr = sPageURL.split('&');

        for (var i = 0; i < qArr.length; i++) {

            pair = qArr[i].split('=');
            queryObject[pair[0]] = pair[1];
        }
        return queryObject;
    }


    async createTrip() {
        const concertData = this.props.concert;
        const dataToSend = {
            artist: concertData.name,
            date : concertData.dates.start.localDate,
            time : concertData.dates.start.localTime,
            venue : concertData._embedded.venues[0].name,
            address: concertData._embedded.venues[0].address.line1 + ' ' + concertData._embedded.venues[0].city.name + '' 
            + concertData._embedded.venues[0].state.stateCode + ', ' + concertData._embedded.venues[0].postalCode,
            latitude : concertData._embedded.venues[0].location.latitude,
            longitude : concertData._embedded.venues[0].location.longitude,
            image: concertData.images[0].url,
            
            }
    
        const params = formatPostData(dataToSend);
            console.log(dataToSend);
        const concert = await axios.post('api/createConcerts.php', params);
        const concertID = concert.data.ID;
        const dataToSend2 = {
            trip_name: "howards super fun trip wow",
            ID: concertID,
        }
        const params2 = formatPostData(dataToSend2);
        const trip = await axios.post('api/createTrip.php', params2);
    }
    render() {

        const cityState = this.props.concert._embedded.venues[0].city.name + ', ' + this.props.concert._embedded.venues[0].state.stateCode + ' ' + this.props.concert._embedded.venues[0].postalCode;

        // let eventTime = this.convertTime(this.props.concert.dates.start.localTime);
        // let convertedDate = this.convertDateFormat(this.props.concert.dates.start.localDate);


        return (
            <div className="newtrip">
                <div className="title">
                    CREATE A NEW TRIP
                    </div>
                <div className="concert-info">
                    <p>
                        <b>Concert: </b>
                        <span>Taylor Swift</span>
                    </p>
                    <p>
                        <b>Venue: </b>
                        <span>Honda Center</span>
                    </p>
                    <p>
                        <b>Address: </b>
                        <span>2695 E Katella Ave</span>
                    </p>
                    <p>
                        <b>City, State: </b>
                        <span>Anaheim, CA 92806</span>
                    </p>

                    <p>
                        <b>Date: </b>
                        <span>May 20, 2019</span>
                    </p>
                    <p>
                        <b>Time: </b>
                        <span>7:00PM</span>
                    </p>
                </div>
                <div className="tripname">
                    <input type="text" className="standard-input" placeholder="Name Your Trip" />
                </div>
                <div className="btn">

                    <Link to="/planner"><button className="pink-btn" onClick={this.createTrip.bind(this)}>CREATE YOUR TRIP!</button></Link>

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
export default connect(mapStateToProps, {get_concert_details: get_concert_details})(NewTrip1);