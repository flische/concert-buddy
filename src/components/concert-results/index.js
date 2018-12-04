import React, { Component } from 'react';
import './concert-results.css'
import ConcertItem from '../concert-item';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../loader';
import Up from '../up';


class ConcertResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            concerts: null,
            url: '',
            showButton: false
        }
    }

    componentDidMount() {
        this.callTicketMaster(this.parseParameters());
        window.scrollTo(0, 0);
        window.addEventListener('scroll', this.handleScroll);
        var elem = document.getElementById('body');
        elem.classList.remove('remove-overflow');

    }

    handleScroll = (e) => {
        if (window.pageYOffset > 900) {
            this.setState({
                showButton: true,
            });
        } else {
            this.setState({
                showButton: false,
            });
        }
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
        }
        return queryObject;
    }

    async callTicketMaster(object) {

        let URL = 'https://app.ticketmaster.com/discovery/v2/events.jsonp?countryCode=US&apikey=86PZJxmHAum8VeEH8EJBOCjucnSAVyGR';

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

        const { data } = await axios.get(URL);

        let concerts = 0;
        if (data._embedded) {
            concerts = data._embedded.events
        }

        this.setState({
            url: URL,
            concerts
        });
    }

    render() {

        if (this.state.concerts === null) {
            return (
                <Loader />
            );
        }

        if (!this.state.concerts) {
            return (
                <div className="no-results">
                    <div className="title">CONCERT RESULTS</div>
                    <div className="no-concerts">
                        No concerts found. Try widening your search criteria.
                        </div>
                    <div className="buttons"> <Link to="/search-concerts">
                        <div className="btn pink-btn">BACK TO SEARCH</div>
                    </Link></div>

                </div>
            );
        }

        const concert = this.state.concerts.map((item, index) => {
            return <ConcertItem
                key={index}
                id={item.id}
                artist={item.name}
                date={item.dates.start.localDate}
                venue={item._embedded.venues[0].name}
                city={item._embedded.venues[0].city.name}
                state={item._embedded.venues[0].state.stateCode}
                queryString={this.props.history.location.search}
            />
        });

        return (
            <div className="results">
                <div className="title">CONCERT RESULTS</div>
                {this.state.showButton && <Up /> || null}
                {concert}
                <div className="buttons">
                    <Link to='/search-concerts'><div className="btn pink-btn">BACK TO SEARCH</div></Link>
                </div>
            </div>
        );
    }
}

export default ConcertResults;