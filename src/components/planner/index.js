import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { get_user_concert_details } from '../../actions';
import { get_user_details} from '../../actions';
import './planner.css';
import axios from 'axios';
import {formatPostData} from '../../helpers';

class Planner extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            peopleGoing: '',

        }
    }
    componentDidMount() { 
        this.checkUserTrips();
        
      
        
    }

    async checkUserTrips (){
        const resp = await axios.post('api/checkUserLoggedIn.php')
        this.props.get_user_details(resp.data.data[0].ID);
    

    }

   async displayUsersGoing() {
       const id = this.props.user_concert.trip_id;
       var dataToSend = {
           tripID: id,
       }
       const params = formatPostData(dataToSend);
       const resp = await axios.post('api/checkWhosGoing.php', params);
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
        const user_concert = this.props.user_concert;
        const whosgoing = this.displayUsersGoing();
        console.log(whosgoing);
        // const leftSide = whosgoing.map((name,index) => {
           
        //     if (index % 2 !== 0) {
        //     return <h2>{name}</h2> 
        //     }
        // });
        // const rightSide = whosgoing.map((name,index) => {
           
        //     if (index % 2 === 0)  {
        //     return <h2>{name}</h2> 
        //     }
        // });
        
        


        if (user_concert === undefined) {
            return <h1>Loading...</h1>;
        }

       
        let eventTime = this.convertTime(user_concert.time);
      

        return (

            <div className="bottom-content">
              
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
                        {/* {leftSide} */}
                    </div>
                    <div className="rightSide">
                        {/* {rightSide} */}
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
    }
}

export default connect(mapStateToProps, { get_user_details: get_user_details })(Planner);