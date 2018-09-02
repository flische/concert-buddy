import React, { Component } from 'react';
import { get_user_concert_details } from '../../actions';
import { Link } from 'react-router-dom';
import RespItem from '../resp-item';
import './responsibility-board.css';
import { formatPostData } from '../../helpers';
import { connect } from 'react-redux';
import axios from 'axios';

class Responsibilities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            responsibilities: []

        };

        this.toggle = this.toggle.bind(this);
        this.itemCompleted = this.itemCompleted.bind(this);
    }

    componentDidMount() {
        this.checkResponsibilities();
    }

    async checkResponsibilities() {
        //make call to database to retrieve array of resp objects
        const dataToSend = {
            trip_id: this.props.user_concert.trip_id
        }

        const params = formatPostData(dataToSend);

        const resp = await axios.post('api/get_responsibilities.php', params);
        console.log('resp on resp-board: ', resp);

        this.setState({
            responsibilities: resp.data.data
        })

    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

    itemCompleted() {
        this.setState({
            completed: !this.state.completed
        });

    }

    render() {
        const resp = this.state.responsibilities

        if (!resp) {
            return (
                <div>
                    <div className="title">RESPONSIBILITIES</div>
                    <div className="no-resp-main">
                        <div className="no-resp">
                            No Responsibilities</div></div>
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
                person={item.name}
                completed={item.completed}
                toggle={this.toggle}
                itemCompleted={this.itemCompleted}
                open={this.state.open}

            />
        });
        return (
            <div>
                <div className="title">RESPONSIBILITIES</div>
                <div className="bottom-content">
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
        user_concert: state.user.details
    }
}

export default connect(mapStateToProps, { get_user_concert_details })(Responsibilities);