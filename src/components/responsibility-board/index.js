import React, { Component } from 'react';
import { get_user_concert_details } from '../../actions';
import { Link } from 'react-router-dom';
import RespItem from '../resp-item';
import respData from './dummy-responsibilities';
import { connect } from 'react-redux';
import axios from 'axios';

class Responsibilities extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            responsibilities: []
        };

        this.toggle = this.toggle.bind(this);
        this.itemCompleted = this.itemCompleted.bind(this);
    }

    componentDidMount() {
        this.checkResponsibilities(this.props.user_concert.trip_id);
    }

    async checkResponsibilities(id) {
        //make call to database to retrieve array of resp objects
        console.log('check responsibilities called: ', id);
        //const resp = await axios.get('api/get_responsibilities.php');
        //this.props.get_responsibilites(resp.???)
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
        console.log(this.props);
        const respItem = respData.map((item) => {

            return <RespItem
                key={item.id}
                id={item.id}
                title={item.title}
                details={item.details}
                person={item.person}
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