import React, {Component} from 'react';
import './acceptance-page.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { formatPostData } from '../../helpers';

class AcceptancePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            trip: []
        }

    }
    getToken(string){
        var obj = {};
        var array = string.split('=');
        obj['token'] = array[1].slice(1);
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
      
        console.log(this.state.trip);
        const {data} = this.state.trip;
        if(!data){
            return (
                <h3>Loading...</h3>
            )
        }
        const {trip_name, artist, date, img, venue, address, time} = data[0];
        return (
            <div className="acceptanceContainer">
                 <div className="detailsHeader title">
                    YOU HAVE BEEN INVITED TO THE TRIP: {trip_name} 
                    <div className="imageContainer">
                        <img src={img} />
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
                        <h2>Tien</h2>
                        <h2>Jhon</h2>
                    </div>
                    <div className="rightSide">
                        <h2>Rebecca</h2>
                        <h2>David</h2>
                    </div>
                </div>
                <div className="buttonArea">
                    <Link to ="/sign-in"><div className="btn white-btn">ACCEPT</div></Link>
                    <div className="btn pink-btn">DECLINE</div>
                </div>
            </div>
        )
    }
}


export default AcceptancePage;