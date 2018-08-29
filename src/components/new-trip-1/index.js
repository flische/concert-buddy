import React, { Component } from 'react';
import './new-trip-1.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatPostData } from '../../helpers';
import { connect } from 'react-redux';
import { get_concert_details, create_trip } from '../../actions';
import { Field, reduxForm, formValueSelector } from 'redux-form';

class NewTrip1 extends Component {

    handleAddItem = async (values) => {

        await this.createTrip(values);

    }


    renderInput( props ){
               return (
                   <div className="">
                       <div className="">
                           <label>{props.label}</label>
                           <input {...props.input} type="text"/>
                           <p>{props.meta.touched && props.meta.error}</p>
                       </div>
                   </div>
               )
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
        return queryObject;    }

    async createTrip(event) {
        const concertData = this.props.concert;
        const dataToSend = {
            artist: concertData.name,
            date : concertData.dates.start.localDate,
            time : concertData.dates.start.localTime,
            venue : concertData._embedded.venues[0].name,
            address: concertData._embedded.venues[0].address.line1 + ' ' + concertData._embedded.venues[0].city.name + ' ' + concertData._embedded.venues[0].state.stateCode + ', ' + concertData._embedded.venues[0].postalCode,
            latitude : concertData._embedded.venues[0].location.latitude,
            longitude : concertData._embedded.venues[0].location.longitude,
            image: concertData.images[0].url,
        }


        const params = formatPostData(dataToSend);
        const concert = await axios.post('api/createConcerts.php', params);
        const concertID = concert.data.ID;

        const dataToSend2 = {
            trip_name: this.props.tripNameValue,
            ID: concertID,
        }
        const params2 = formatPostData(dataToSend2);
        const newTrip = await axios.post('api/createTrip.php', params2);
        this.props.history.push('/planner');
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
        const cityState = this.props.concert._embedded.venues[0].city.name + ', ' + this.props.concert._embedded.venues[0].state.stateCode + ' ' + this.props.concert._embedded.venues[0].postalCode;
        const time = this.convertTime(this.props.concert.dates.start.localTime);
        const date = this.convertDateFormat(this.props.concert.dates.start.localDate);
        console.log(date);

        const { handleSubmit } = this.props;


        return (
            <div className="newtrip">
                <div className="title">
                    CREATE A NEW TRIP
                    </div>
                <div className="concert-info">
                    <p>
                        <b>Concert: </b>
                        <span>{this.props.concert.name}</span>
                    </p>
                    <p>
                        <b>Venue: </b>
                        <span>{this.props.concert._embedded.venues[0].name}</span>
                    </p>
                    <p>
                        <b>Address: </b>
                        <span>{this.props.concert._embedded.venues[0].address.line1}</span>
                    </p>
                    <p>
                        <b>City, State: </b>
                        <span>{cityState}</span>
                    </p>

                    <p>
                        <b>Date: </b>
                        <span>{date}</span>
                    </p>
                    <p>
                        <b>Time: </b>
                        <span>{time}</span>
                    </p>
                </div>
                <div className="tripname">
                    <form onSubmit={handleSubmit(this.handleAddItem)}>
                        <Field className="standard-input" name="trip_name" id="trip_name" label="Name Your Trip" component={this.renderInput} />
                        <div className="buttons">
                            <button className="btn pink-btn" onClick={this.createTrip.bind(this)}>CREATE YOUR TRIP! </button>
                        </div>
                    </form>
                </div>
            </div>
        );ß
    }
}

function validate(values){
    // Redux Form will look at the properties below and see if they match any of the Field name (inputs) //
    // you can do any kind of check in here that you want! to validate input //
    // for example, RegEx for validating proper email or password! //

    const { trip_name } = values;

    const errors = {};
    console.log(trip_name);
    if(trip_name){
        if(trip_name.length < 3){
            errors.trip_name = 'Please enter a trip name of 3 or more characters in length!'
        }
    }
    // if(!trip_name){
    //     errors.trip_name = 'Please name your trip!'
    // }
   
    return errors;
}

function mapStateToProps(state) {
    return {
        concert: state.concertDetails.concert
    }
}

NewTrip1 = reduxForm({
    form: 'create_trip',
    validate: validate
})(NewTrip1);

const selector = formValueSelector('create_trip');

NewTrip1 = connect(state => {
    const tripNameValue = selector(state, 'trip_name');

    return {
        tripNameValue
    };
})(NewTrip1);

export default connect(mapStateToProps, { get_concert_details: get_concert_details, create_trip: create_trip })(NewTrip1);