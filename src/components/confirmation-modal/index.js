import React from 'react';
import './confirmation-modal.css'
import {Link} from 'react-router-dom';

const Modal = ({handleClose, show, children}) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    const buttonStyle = {
        color: 'white',
        backgroundColor: 'powderblue'
    }
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <Link to="/planner"><div style={buttonStyle} className="btn">GO HOME</div></Link>
                <button className="pink-btn" onClick={handleClose}>CLOSE</button>
            </section>
        </div>
    )
}

export default Modal;