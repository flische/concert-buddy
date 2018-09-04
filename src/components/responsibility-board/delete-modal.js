import React from 'react';
import './delete-modal.css';


const DeleteModal = ({ handleClose, show, deleteItem, props }) => {
    const showHideClassName = show ? 'delete-modal display-block' : 'delete-modal display-none';
    const buttonStyle = {
        color: 'white',
        backgroundColor: 'red'
    }

    console.log('props in delete modal: ', props);

    return (

        <div className={showHideClassName}>
            <section className="delete-modal-main">
                <div className="buttons"><div style={buttonStyle} className="btn" onClick={() => deleteItem(props.id)}>DELETE</div>
                    <button className="pink-btn" onClick={handleClose}>CLOSE</button>
                </div>
            </section>
        </div>
    )
}

export default DeleteModal;