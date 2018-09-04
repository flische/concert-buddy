import React, {Component} from 'react';
import './delete-modal.css';


const DeleteModal = (props) => {
    const{handleClose, show, deleteItem, id} = props;
    const showHideClassName = show ? 'delete-modal display-block' : 'delete-modal display-none';
    const buttonStyle = {
        color: 'white',
        backgroundColor: 'red',
        width: '85%'
    }

    return (

        <div className={showHideClassName}>
            <section className="delete-modal-main">
                <p>Are you sure you want to delete this responsibility?</p>

                <div className="buttons"><div style={buttonStyle} className="btn" onClick={() => deleteItem(id)}>DELETE</div>
                    <button className="blue-btn" onClick={handleClose}>CLOSE</button>
                </div>
            </section>
        </div>
    )
}

export default DeleteModal;