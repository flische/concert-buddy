import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RespItem from '../resp-item';
import './responsibility-board.css';
import { formatPostData } from '../../helpers';
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from '../loader';

class Responsibilities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            responsibilities: null,
            show: false,
        };

        this.toggle = this.toggle.bind(this);
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
        this.checkResponsibilities();
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

    deleteItem = async (id) => {
        const dataToSend = {
            trip_id: this.props.user_concert.trip_id,
            id: id
        }
        console.log('Delete Item Called:', dataToSend);
        const params = formatPostData(dataToSend);
        const resp = await axios.post('api/delete_responsibilities.php', params);

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
                name={item.name}
                completed={item.completed}
                toggle={this.toggle}
                itemCompleted={this.itemCompleted}
                open={this.state.open}
                deleteItem={this.deleteItem}
                showModal={this.showModal}
                chkResp={this.checkResponsibilities}


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
                {/* <DeleteModal show={this.state.show} handleClose={this.hideModal} deleteItem={this.deleteItem} tripid={this.props.user_concert.trip_id} props={this.props} >
                    <p>Are you sure you want to delete this responsibility?</p>
                </DeleteModal> */}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        user_concert: state.user.details
    }
}

export default connect(mapStateToProps)(Responsibilities);