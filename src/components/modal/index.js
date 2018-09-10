import React from 'react';
import './modal.css'

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button className="pink-btn" onClick={handleClose}>CLOSE</button>
            </section>
        </div>
    )
}

export default Modal;