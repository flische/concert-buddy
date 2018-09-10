import React, {Component} from 'react';
import './acceptance-page.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { formatPostData } from '../../helpers';
import { connect } from 'react-redux'
import Loader from '../loader'
import Modal from '../modal'

class AcceptancePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            trip: [],
            show: false,
        }

    }
    showModal = () => {
        this.setState({
            show: true,
        })
    }
    hideModal = () => {
        this.setState({
            show: false,
        })
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
      const accept  =  await axios.post('api/accept_invite.php', params);
     if (accept.data.success) { 
      window.localStorage.clear();
      this.props.history.push("/planner");
    }
                        }
    else {
        this.showModal();
    }
            }
    getToken(string){
        var obj = {};
        var array = string.split('=');
        obj['token'] = array[1].slice(0);
        return obj;
    }
    declineTrip(){
        this.props.history.push('/');
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
            borderRadius: '5%',
        }
        console.log(this.state.trip);
        const {data, whosGoing} = this.state.trip;
        console.log('whos going ', whosGoing);

        let evenArray = [];
        let oddArray = [];
        
        if(whosGoing){
            for (let i = 0; i < whosGoing.length; i++) {
                if (i % 2 === 0) {
                    evenArray.push(<div key={whosGoing[i]}>{whosGoing[i]}</div>)
                } else {
                    oddArray.push(<div key={whosGoing[i]}>{whosGoing[i]}</div>)
                }
            }
        }
        if(!data){
            return (
                <Loader/>   
            )
        }
        const {trip_name, artist, date, img, venue, address, time} = data[0];
        return (
            <div className="acceptanceContainer">
                 <div className="detailsHeader title">
                    YOU HAVE BEEN INVITED TO: <br /> {trip_name} 
                    <div className="imageContainer">
                        <br />
                        <img style={imageStyle} src={img} />
                    </div>
                </div>
                <div className="concert-overview-acceptance">
                    <div>
                        <h2>EVENT: <b><span>{artist}</span></b></h2>
                    </div>
                    <div>
                        <h2>DATE: <b><span>{date}</span></b> </h2>
                    </div>
                    <div>
                        <h2>VENUE: <b><span>{venue}</span></b></h2>
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
                     <div className="btn white-btn" onClick={this.acceptTrip.bind(this)}>ACCEPT</div>
                    
                    <div className="btn pink-btn" onClick={this.declineTrip.bind(this)}>DECLINE</div>
                </div>
                <Modal show={this.state.show} handleClose={this.hideModal} >
                    <p className="modal-p center">Please Login or Sign Up before accepting this trip!</p>
                    <Link to="/sign-in"><div className="btn black-btn">SIGN IN</div></Link>
                    </Modal>
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