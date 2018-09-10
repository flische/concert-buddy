import React from 'react';
import './modal.css'
import { Link } from 'react-router-dom';

const DefaultModal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <Link to="/planner"><div className="btn button-color">GO HOME</div></Link>
                <button className="pink-btn" onClick={handleClose}>CLOSE</button>
            </section>
        </div>
    )
}

export default DefaultModal;