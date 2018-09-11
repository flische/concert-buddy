import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RespItem from '../resp-item';
import './responsibility-board.css';
import { formatPostData } from '../../helpers';
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from '../loader';
import { get_user_details } from '../../actions'

class Responsibilities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            responsibilities: null,
            show: false
        };

        this.itemCompleted = this.itemCompleted.bind(this);
    }

    showModal = () => {
        this.setState({
            show: true
        })
    }
    hideModal = () => {
        this.setState({
            show: false
        })
    }

    componentDidMount() {
        const user  = this.props.get_user_details().then( (user) => { // calls get user details on componentDidMount THEN...
            this.checkResponsibilities(); // calls check responsibilities!
        });
    }

    async checkResponsibilities() {
        const dataToSend = {
            trip_id: this.props.user_concert.trip_id
        }
        const params = formatPostData(dataToSend);
        const resp = await axios.post('api/get_responsibilities.php', params);

        this.setState({
            responsibilities: resp.data.data
        })

    }
    deleteItem = async (id) => {
        const dataToSend = {
            trip_id: this.props.user_concert.trip_id,
            id: id

        }
        const params = formatPostData(dataToSend);
        const resp = await axios.post('api/delete_responsibilities.php', params);

        this.checkResponsibilities();
    }

    itemCompleted = async (id, completed) => {
        const dataToSend = {
            ID: id,
            completed: completed
        }

        const params = formatPostData(dataToSend);
        const resp = await axios.post('api/toggle_responsibilities.php', params);

        this.checkResponsibilities();
    }

    render() {
        if (this.state.responsibilities === null) {
            return (
                <Loader />
            )
        }

        const resp = this.state.responsibilities
        if (!resp) {
            return (
                <div className="div-container">
                    <div className="title">RESPONSIBILITIES</div>
                    <div className="no-resp-main">
                        <div className="no-resp">
                            Your group does not currently have any responsibilities listed.</div></div>
                    <div className="buttons">
                        <Link to="/add-responsibility"><div className="btn pink-btn">ADD RESPONSIBILITY</div></Link>
                        <Link to="/planner"><div className="btn white-btn">GO TO PLANNER</div></Link>
                    </div>
                </div>
            );
        }

        const respItem = resp.map((item) => {

            return <RespItem
                key={item.ID}
                id={item.ID}
                title={item.title}
                details={item.details}
                name={item.name}
                completed={item.completed}
                toggle={this.toggle}
                itemCompleted={this.itemCompleted}
                deleteItem={this.deleteItem}
                showModal={this.showModal}
                chkResp={this.checkResponsibilities}


            />
        });
        return (
            <div>
                <div className="title">RESPONSIBILITIES</div>
                <div className="resp-content">
                    {respItem}
                </div>
                <div className="buttons">
                    <Link to="/add-responsibility"><div className="btn pink-btn">ADD RESPONSIBILITY</div></Link>
                    <Link to="/planner"><div className="btn white-btn">GO TO PLANNER</div></Link>
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

export default connect(mapStateToProps, { get_user_details: get_user_details })(Responsibilities);
