import React, {Component} from 'react';
import './acceptance-page.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { formatPostData } from '../../helpers';
import { connect } from 'react-redux'

class AcceptancePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            trip: []
        }

    }
   async acceptTrip() {
       if (this.props.auth) {
            let pageURL = window.location.search.substring(1);
        let tokenObj = this.getToken(pageURL);
        const token = tokenObj["token"];
        const tokenData = {
            token: token,
                          }
      const params = formatPostData(tokenData)
      await axios.post('api/accept_invite.php', params);
      window.localStorage.clear();
                        }
            }
    getToken(string){
        var obj = {};
        var array = string.split('=');
        obj['token'] = array[1].slice(0);
        return obj;
    }
    componentDidMount(){
        let pageURL = window.location.search.substring(1);
        console.log(pageURL);
        let tokenObj = this.getToken(pageURL);
        var token = tokenObj["token"]
        localStorage.setItem('token', token);
        var test = this.getConcertDetails(this.getToken(pageURL));
        console.log('test', test);

    }
    async getConcertDetails(object){
        let params = formatPostData(object);
        const {data : tripDetails} = await axios.post('api/invited.php', params);

        console.log(tripDetails);
        this.setState({
            trip: tripDetails   
        })
    }
    render(){
        const imageStyle = {
            border: '3px solid powderblue',
            borderRadius: '5%'
        }
        console.log(this.state.trip);
        const {data, whosGoing} = this.state.trip;
        console.log('whos going ', whosGoing);

        let evenArray = [];
        let oddArray = [];
        
        if(whosGoing){
            for (let i = 0; i < whosGoing.length; i++) {
                if (i % 2 === 0) {
                    evenArray.push(<h2 key={whosGoing[i]}>{whosGoing[i]}</h2>)
                } else {
                    oddArray.push(<h2 key={whosGoing[i]}>{whosGoing[i]}</h2>)
                }
            }
        }
        if(!data){
            return (
                <h3>Loading...</h3>
            )
        }
        const {trip_name, artist, date, img, venue, address, time} = data[0];
        return (
            <div className="acceptanceContainer">
                 <div className="detailsHeader title">
                    YOU HAVE BEEN INVITED TO: {trip_name} 
                    <div className="imageContainer">
                        <br />
                        <img style={imageStyle} src={img} />
                    </div>
                </div>
                <div className="concert-overview-acceptance">
                    <div>
                        <h2>ARTIST: <span>{artist}</span></h2>
                    </div>
                    <div>
                        <h2>DATE: <span>{date}</span> </h2>
                    </div>
                    <div>
                        <h2>VENUE: <span>{venue}</span> </h2>
                    </div>
                </div>
                <div className="title">WHO'S GOING?</div>
                <div className="attendees-acceptance">
                    <div className="leftSide">
                        {evenArray}
                    </div>
                    <div className="rightSide">
                        {oddArray}
                    </div>
                </div>
                <div className="buttonArea">
                    <Link to={this.props.userAuth ? "/sign-in" : "/planner"} onClick={this.acceptTrip.bind(this)}> <div className="btn white-btn">ACCEPT</div></Link>
                    
                    <div className="btn pink-btn">DECLINE</div>
                </div>
            </div>
        )
    }
}

function  mapStateToProps(state){
    return {
        auth: state.userAuth.auth
    }
}

export default connect(mapStateToProps)(AcceptancePage);