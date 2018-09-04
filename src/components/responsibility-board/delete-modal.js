import React, {Component} from 'react';
import './delete-modal.css';


const DeleteModal = (props) => {
    const{handleClose, show, deleteItem, id} = props;
    const showHideClassName = show ? 'delete-modal display-block' : 'delete-modal display-none';
    const buttonStyle = {
        color: 'white',
        backgroundColor: 'red'
    }

    console.log('PROPS INSIDE THE DELETE MODAL!!!!!!!!!!!!', props);


    return (

        <div className={showHideClassName}>
            <section className="delete-modal-main">
                <div className="buttons"><div style={buttonStyle} className="btn" onClick={() => deleteItem(id)}>DELETE</div>
                    <button className="pink-btn" onClick={handleClose}>CLOSE</button>
                </div>
            </section>
        </div>
    )
}

export default DeleteModal;