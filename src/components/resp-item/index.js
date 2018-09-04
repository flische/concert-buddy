import React, {Component} from 'react';
import './resp-item.css';
import { Link } from 'react-router-dom';
import DeleteModal from '../responsibility-board/delete-modal';

class RespItem extends Component {
    constructor(props){
        super(props)

        this.state = {
            open: false,
            show: false
        }
    }
    showModal = ()=>{
        this.setState({
            show: true
        })
    }
    hideModal = () => {
        this.setState({
            show: false
        })
    }
    render(){
        console.log('props in resp item: ', this.props)

        return (
            <div className={"responsibilities" + (this.props.completed !== "0" ? ' completed' : '')}>
                <div className="x" onClick={() => {this.showModal(this.props.id) }}>&times;</div>
                {this.props.completed !== "0" ? <p><s>{this.props.title}</s></p> : <p>{this.props.title}</p>}
                <p>Assigned to: <span><b>{this.props.name}</b></span></p>
                <div>
                    <button className="toggle-btn" onClick={this.props.toggle}>DETAILS</button>

                    <div className={"collapse" + (this.props.open ? ' in' : '')}>
                        <div>{this.props.details}</div>
                    </div>
                </div>
                <div className="mark-complete-btn pink-btn" onClick={this.props.itemCompleted}>MARK COMPLETE</div>
                <Link to={`/edit-responsibility?ID=${this.props.id}`}><div className="edit">EDIT</div></Link>
                <DeleteModal show={this.state.show} handleClose={this.hideModal} deleteItem={this.props.deleteItem} id={this.props.id}>
                    <p>Are you sure you want to delete this responsibility?</p>
                </DeleteModal>
            </div>
        )
    }
}

export default RespItem;

