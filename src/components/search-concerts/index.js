import React, { Component } from 'react';
import './search-concerts.css'
import axios from 'axios'
import { Link } from 'react-router-dom';


class SearchConcerts extends Component {
    constructor(props) {
        super(props);


        this.state = {
            form: {
                city_zip: '',
                artist: '',
                genre: '',
                begin_date: '',
                end_date: ''

            },
            concerts: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log('Called handleFormSubmit: ', this.state.form);

        const newState = {
            form: {
                city_zip: '',
                artist: '',
                genre: '',
                begin_date: '',
                end_date: ''

            }
        }
        this.setState(newState);
        this.ticketmasterCall();

    }

    ticketmasterCall() {
        var form = this.state.form;
        console.log(form.city_zip);
        var URL = 'https://app.ticketmaster.com/discovery/v2/events.jsonp?apikey=86PZJxmHAum8VeEH8EJBOCjucnSAVyGR';

        if (isNaN(form.city_zip)) {
            URL = URL + '&city=' + form.city_zip;
        } else if (form.city_zip) {
            URL = URL + '&postalCode=' + form.city_zip;
        }
        console.log('location: ', form.city_zip);

        if (form.genre) {
            URL = URL + '&classificationName=' + form.genre;
        }

        if (form.artist) {
            URL = URL + '&keyword=' + form.artist;
        }

        if (form.begin_date) {
            URL = URL + '&startDateTime=' + form.begin_date + 'T12:00:00Z';
        }
        if (form.end_date) {
            URL = URL + '&endDateTime=' + form.end_date + 'T11:59:00Z';;
        }

        axios.get(URL).then((resp) => {
            console.log(URL);
            this.setState({
                concerts: resp.data._embedded.events
            });
        });


    }

    handleChange(event) {
        const { name, value } = event.target;
        const { form } = this.state;
        this.setState({ form: { ...form, [name]: value } });
    }




    render() {
        console.log('concerts: ', this.state.concerts);
        const { city_zip, artist, genre, begin_date, end_date } = this.state.form;

        return (
            <div>
                <div className="title"> SEARCH CONCERT</div>

                <div className="bottom-content">
                    <form onSubmit={(event) => { this.handleFormSubmit(event) }}>
                        <div className="inputs">
                            <input type="text" className="standard-input" placeholder="Enter City or Zip Code" name="city_zip" value={city_zip} onChange={this.handleChange} />
                            <input type="text" className="standard-input" placeholder="Search by Artist" name="artist" value={artist} onChange={this.handleChange} />
                            <select className="dropdown" name="genre" name="genre" value={genre} onChange={this.handleChange} >
                                <option value="null">Search by Genre</option>
                                <option value="rock">ROCK</option>
                                <option value="country">COUNTRY</option>
                                <option value="pop">POP</option>
                                <option value="r-b">R&B</option>
                            </select>

                        </div>

                        <div className="title">DATE RANGE</div>
                        <div className="date-holder">
                            <div className='inputs'>
                                <input type="date" className="standard-input date" placeholder="Beginning Date" name="begin_date" value={begin_date} onChange={this.handleChange} />
                                <input type="date" className="standard-input date" placeholder="End Date" name="end_date" value={end_date} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="buttons">
                            <button className="pink-btn">SEARCH CONCERTS</button>
                        </div>
                    </form>
                </div>
            </div>


        );

    }

}

export default SearchConcerts;
