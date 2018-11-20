import React, { Component } from 'react';
import './resp-item.css';
import { Link } from 'react-router-dom';
import Modal from '../modal';

class RespItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            show: false
        }
    }

    showModal = () => {
        this.setState({
            show: true
        });

        var elem = document.getElementById('body');
        elem.classList.add('remove-overflow');
    }

    hideModal = () => {
        this.setState({
            show: false
        });

        var elem = document.getElementById('body');
        elem.classList.remove('remove-overflow');
    }

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {

        return (
            <div className={"responsibilities" + (this.props.completed ? ' completed' : '')}>
                <div className="x" onClick={() => { this.showModal(this.props.id) }}>&times;</div>
                {this.props.completed ? <p><s>{this.props.title}</s></p> : <p>{this.props.title}</p>}
                <p>Assigned to: <span><b>{this.props.name}</b></span></p>
                <div>
                    <div className="toggle-btn" onClick={this.toggle}>DETAILS</div>
                    <div className={"collapse" + (this.state.open ? ' in' : '')}>
                        <div>{this.props.details}</div>
                    </div>
                </div>

                {!this.props.completed ? <div className="mark-complete-btn pink-btn" onClick={() => { this.props.itemCompleted(this.props.id, this.props.completed) }}>MARK COMPLETE</div> : <div className="mark-complete-btn btn-grey" onClick={() => { this.props.itemCompleted(this.props.id, this.props.completed) }}>COMPLETED</div>}
                {!this.props.completed ? <Link className="edit" to={`/edit-responsibility?edit_id=${this.props.id}`}><div className="edit">EDIT</div></Link> : ''}

                <Modal show={this.state.show} handleClose={this.hideModal} deleteItem={this.props.deleteItem} id={this.props.id}>
                    <p>Are you sure you want to delete this responsibility?</p>
                    <div className="buttons"><div className="btn black-btn" onClick={() => this.props.deleteItem(this.props.id)}>DELETE</div></div>
                </Modal>
            </div>
        );
    }
}

export default RespItem;

