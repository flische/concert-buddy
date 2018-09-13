import React from 'react';
import './modal.css'
import { Link } from 'react-router-dom';


const RespModal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <div className="buttons">
                    <Link to="/search-concerts"><button className="pink-btn">SEARCH CONCERTS</button></Link>
                </div>
            </section>
        </div>
    )
}

export default RespModal;