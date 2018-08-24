import React, { Component } from 'react';
import './concert-results.css'
import ConcertItem from '../concert-item';
import axios from 'axios';



class ConcertResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            concerts: [],
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

    callTicketMaster(object) {

        let URL = 'https://app.ticketmaster.com/discovery/v2/events.jsonp?apikey=86PZJxmHAum8VeEH8EJBOCjucnSAVyGR';

        if (isNaN(object.city_zip)) {
            URL = URL + '&city=' + object.city_zip;
        } else if (object.city_zip) {
            URL = URL + '&postalCode=' + object.city_zip;
        }
        if (object.genre) {
            URL = URL + '&classificationName=' + object.genre;
        }
        if (object.artist) {
            URL = URL + '&keyword=' + object.artist;
        }
        if (object.begin_date) {
            URL = URL + '&startDateTime=' + object.begin_date + 'T12:00:00Z';
        }
        if (object.end_date) {
            URL = URL + '&endDateTime=' + object.end_date + 'T23:59:00Z';
        }

        axios.get(URL).then((resp) => {
            this.setState({
                url: URL,
                concerts: resp.data._embedded.events

            });
        });

    }

    render() {
        //console.log('props history concert results: ', this.props.history);

        const concert = this.state.concerts.map((item, index) => {
            return <ConcertItem
                key={index}
                id={item.id}
                artist={item.name}
                date={item.dates.start.localDate}
                time={item.dates.start.localTime}
                venue={item._embedded.venues[0].name}
                address={item._embedded.venues[0].address.line1}
                city={item._embedded.venues[0].city.name}
                state={item._embedded.venues[0].state.stateCode}
                zip={item._embedded.venues[0].postalCode}
                latitude={item._embedded.venues[0].location.latitude}
                longitude={item._embedded.venues[0].location.longitude}
                image={item.images[0].url}
                queryString={this.props.history.location.search}/>

        });
        return (
            <div className="results">
                <div className="title">CONCERT RESULTS</div>
                {concert}
                
            </div >
        );
    }
}

export default ConcertResults;