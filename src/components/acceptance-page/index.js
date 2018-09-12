import React, { Component } from 'react';
import './acceptance-page.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatPostData } from '../../helpers';
import { connect } from 'react-redux'
import Loader from '../loader'
import Modal from '../modal'
import { get_user_details } from '../../actions'

class AcceptancePage extends Component {
    constructor(props) {
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
            if (this.props.user_details.trip_id) {
                this.showModal();
            }
            else {
                let pageURL = window.location.search.substring(1);

                let tokenObj = this.getToken(pageURL);
                const token = tokenObj["token"];
                const tokenData = {
                    token: token,
                    action: 'accept_invite'
                }
                const params = formatPostData(tokenData)
                const accept = await axios.post('api/handle_email.php', params);

                if (accept.data.success) {
                    window.localStorage.clear();
                    this.props.history.push("/planner");
                }
            }
        } else {
            this.showModal();
        }
    }

    getToken(string) {
        var obj = {};
        var array = string.split('=');
        obj['token'] = array[1].slice(0);
        return obj;
    }
    declineTrip() {
        this.props.history.push('/');
    }
    async componentDidMount() {
        if (this.props.auth) {
            this.props.get_user_details();
        }
        let pageURL = window.location.search.substring(1);
        let tokenObj = this.getToken(pageURL);
        const token = tokenObj["token"];
        localStorage.setItem('token', token);
        const test = this.getConcertDetails(this.getToken(pageURL));
    }
    async getConcertDetails(object) {
        object.action = 'invited';
        let params = formatPostData(object);
        const response = await axios.post('api/handle_email.php', params);
        const { data: tripDetails } = response;
        if (response.data.data[0] === null) {
            this.props.history.push('/404');
        }
        this.setState({
            trip: tripDetails
        });
    }

    render() {
        const { data, whosGoing } = this.state.trip;
        let evenArray = [];
        let oddArray = [];

        if (whosGoing) {
            for (let i = 0; i < whosGoing.length; i++) {
                if (i % 2 === 0) {
                    evenArray.push(<div key={whosGoing[i]}>{whosGoing[i]}</div>);
                } else {
                    oddArray.push(<div key={whosGoing[i]}>{whosGoing[i]}</div>);
                }
            }
        }
        if (!data) {
            return (
                <Loader />
            );
        }
        const { trip_name, artist, date, img, venue, address, time } = data[0];

        return (
            <div className="acceptanceContainer">
                <div className="detailsHeader title">
                    YOU HAVE BEEN INVITED TO: <br /> {trip_name}
                    <div className="image-container">
                        <img src={img} />
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
                <div className="buttons">
                    <div className="btn white-btn" onClick={this.acceptTrip.bind(this)}>ACCEPT</div>

                    <div className="btn pink-btn" onClick={this.declineTrip.bind(this)}>DECLINE</div>
                </div>
                {this.props.auth ? <Modal show={this.state.show} handleClose={this.hideModal} >
                    <p className="modal-p center">You already have an existing trip! Please go to your current trip</p>
                    <Link to="/planner"><div className="btn black-btn">Planner</div></Link>
                </Modal> : <Modal show={this.state.show} handleClose={this.hideModal} >
                        <p className="modal-p center">Please Login or Sign Up before accepting this trip!</p>
                        <Link to="/sign-in"><div className="btn black-btn">SIGN IN</div></Link>
                    </Modal>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.userAuth.auth,
        user_details: state.user.details
    }
}

export default connect(mapStateToProps, { get_user_details })(AcceptancePage);