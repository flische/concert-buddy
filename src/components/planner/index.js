import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { get_user_concert_details } from '../../actions';
import { get_user_details} from '../../actions';
import './planner.css';
import axios from 'axios';
import {formatPostData} from '../../helpers';
import {Link, Redirect} from 'react-router-dom'

class Planner extends Component {

    constructor(props) { 

        super(props);

        this.state = {
            redirect: false,
        }
    }
    componentDidMount() { 
       this.checkLoginStatus();
       this.checkUserTrips();  
    }

    async checkLoginStatus(initialCheck=false) { 
        const resp = await axios.post('api/checkUserLoggedIn.php');
        console.log(resp);
        if (resp.data.error) {
         
            this.setState({redirect: !this.state.redirect});
        }
     }

    async checkUserTrips (){
        const resp = await axios.post('api/checkUserLoggedIn.php')
        this.props.get_user_details(resp.data.data[0].ID);
        console.log(this.props.details);
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
    renderRedirect() {
        if (this.state.redirect) {
        return <Redirect to='/login' />
    }
}

    render() {
        const user_concert = this.props.user_concert;
        const arrayOfPeopleGoing = this.props.users_attending;
        console.log('people going: ', arrayOfPeopleGoing);

        if(arrayOfPeopleGoing) {
            var evenArray = [];
            var oddArray =[];
            for(let i = 0; i < arrayOfPeopleGoing.length; i++){
                if(i % 2 === 0){
                    evenArray.push(<h2>{arrayOfPeopleGoing[i]}</h2>)
                } else {
                    oddArray.push(<h2>{arrayOfPeopleGoing[i]}</h2>)
                }
            }
            console.log('even', evenArray)
        }
        if (!user_concert) {
            return  (
                <div className="title">
                    <h1> No Current Trips</h1>
                    <div className="concert-overview">
                        <div>
                            <h2>Please create a concert</h2>
                            <Link to="/search-concerts"><div className="btn pink-btn">Search Concerts</div></Link>
                        </div>
                    </div>
                </div>
            )
        }

       
        let eventTime = this.convertTime(user_concert.time);


        return (
            <div className="bottom-content">
              {this.renderRedirect()}
                <div className="title">
                   <h1> {user_concert.trip_name}</h1>
                </div>
                <div className="concert-overview">
                    <div>
                        <h2>Concert: {user_concert.artist}</h2>
                    </div>
                    <div>
                        <h2>Date: {user_concert.date} @ {eventTime}</h2>
                    </div>
                    <div>
                        <h2>Location: {user_concert.address + ''}</h2>
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
        user_concert: state.user.details,
        users_attending: state.user.going
    }
}

export default connect(mapStateToProps, { get_user_details: get_user_details })(Planner);