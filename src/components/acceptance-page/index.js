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
        var test = this.getConcertDetails(this.getToken(pageURL));
        console.log('test', test)
    }
    async getConcertDetails(object){
        let params = formatPostData(object);
        const tripDetails = await axios.post('api/invited.php', params);
        console.log(tripDetails);
        this.setState({
            trip: tripDetails
        })
    }
    render(){
        console.log(this.state.trip);
        return (
            <div className="container">
                 <div className="detailsHeader title">
                    YOUR INVITED TRIP DETAILS: 
                    <div className="imageContainer">
                        <img src="https://www.rollingstone.com/wp-content/uploads/2018/09/eminem-kamikaze-review1.jpg?crop=900:600&width=440" alt="eminem"/>
                    </div>
                </div>
                <div className="concert-overview">
                    <div>
                        <h2>Concert: </h2>
                    </div>
                    <div>
                        <h2>Date: </h2>
                    </div>
                    <div>
                        <h2>Location: </h2>
                    </div>
                </div>
                <div className="title">WHO'S GOING?</div>
                <div className="attendees">
                    <div className="leftSide">
                        Tien
                    </div>
                    <div className="rightSide">
                        Rebecca
                    </div>
                </div>
                <div className="buttonArea">
                    <Link to ="/login"><div className="btn white-btn">ACCEPT</div></Link>
                    <div className="btn pink-btn">DECLINE</div>
                </div>
            </div>
        )
    }
}


export default AcceptancePage;