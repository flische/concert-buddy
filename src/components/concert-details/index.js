import React, { Component } from 'react';
import './concert-details.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

class ConcertDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            concerts: {},
            url: ''
        }
    }

    componentDidMount() {
        this.parseParameters();
    }

    parseParameters() {
        //const queryString = this.props.history.location.search;
        var queryObject = {};
        var pair = null;
        //get the query string, omitting the "?"
        var sPageURL = window.location.search.substring(1),
            //use the ampersand as a separator
            qArr = sPageURL.split('&');
        //each element in qArr is not a key/val pair
        //so we need to turn each one of these pairs
        //into a two-element array
        for (var i = 0; i < qArr.length; i++) {
            //use the "=" as a separator
            pair = qArr[i].split('=');
            //pair is now a two-element array
            //so the "key" is the first element of that array
            //and the "val" is the second element
            //so now we just add this "pair" to our return object
            queryObject[pair[0]] = pair[1];
        };
        //return the new object
        this.callTicketMaster(queryObject);
        return queryObject;
    }

    async callTicketMaster(object) {
        let URL = 'https://app.ticketmaster.com/discovery/v2/events.jsonp?apikey=86PZJxmHAum8VeEH8EJBOCjucnSAVyGR';
        if (object.id) {
            URL = URL + '&id=' + object.id;
        }
        await axios.get(URL).then((resp) => {
            this.setState({

                concerts: resp.data._embedded.events[0],
                url: URL

            });
        });

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
        const concert = this.state.concerts;
        console.log('concert details: ', concert);


        if (concert._embedded === undefined) {
            return <h1>Loading...</h1>;
        }
        const cityState = concert._embedded.venues[0].city.name + ', ' + concert._embedded.venues[0].state.stateCode;
        let eventTime = this.convertTime(concert.dates.start.localTime);
        let convertedDate = this.convertDateFormat(concert.dates.start.localDate);
        console.log('props history concert details: ', this.props);
        return (
            <div className="details">

                <div className="title">
                    CONCERT DETAILS
                    </div>
                <img src={concert._embedded.attractions[0].images[1].url} />


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
                    <a href={concert.url} target='_blank'><button className="white-btn">BUY TICKETS</button></a>
                    <button className="pink-btn">CREATE A TRIP</button>
                    <button className="white-btn">BACK TO RESULTS</button>
                </div>


            </div>

        );
    }
}

export default ConcertDetails;