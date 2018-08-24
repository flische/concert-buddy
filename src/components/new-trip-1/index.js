import React, { Component } from 'react';
import './new-trip-1.css'
import './new-trip-1.css';
import axios from 'axios';
import  {formatPostData } from '../../helpers';

// import formatPostData from '../helpers';


class NewTrip1 extends Component {
    constructor(props){
        super(props);

        this.state = {
            concerts: {},
            url: ''
        };

        // this.concertID = '';
    }
    componentDidMount() {
        this.parseParameters();
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

        this.callTicketMaster(queryObject);
        return queryObject;
    }


    async callTicketMaster() {
        let URL = 'https://app.ticketmaster.com/discovery/v2/events.jsonp?apikey=86PZJxmHAum8VeEH8EJBOCjucnSAVyGR&id=Z7r9jZ1Ae8AGe';
        
        const response = await axios.get(URL)
        const concertData = response.data._embedded.events[0];
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
        const trip = await axios.post('api/createConcerts.php', params);
        const tripdata= trip.data
        const dataToSend2 = {
            trip_name: "howards super fun trip wow",
            tripID: tripdata,
        }
    }
    render() {
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
                <div className="buttons">

                    <button className="pink-btn" onClick={this.callTicketMaster}>CREATE YOUR TRIP!</button>

                </div>
            </div>

        );
    }
}

export default NewTrip1;
