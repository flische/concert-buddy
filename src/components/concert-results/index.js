import React, { Component } from 'react';
import './concert-results.css'


class ConcertResults extends Component {

    render() {
        return (
            <div className="results">
                <div className="title">CONCERT RESULTS</div>
                <div className="concert-result-container">
                    <div className="concert-results">
                        <div className="concert-part-a">
                            <p>
                                <b>Concert: </b>
                                <span>Taylor Swift</span>
                            </p>
                            <p>
                                <b>Date: </b>
                                <span>May 20, 2019</span>
                            </p>
                        </div>
                        <div className="concert-part-b">
                            <p>
                                <b>Venue: </b>
                                <span>Honda Center</span>
                            </p>
                            <p>
                                <b>Location: </b>
                                <span>Anaheim, CA</span>
                            </p>
                        </div>
                    </div>
                    <div className="buttons"><button className="white-btn">DETAILS</button></div>
                    <div className='hr'><hr /></div>
                </div>


                <div className="concert-result-container">
                    <div className="concert-results">
                        <div className="concert-part-a">
                            <p>
                                <b>Concert: </b>
                                <span>Taylor Swift</span>
                            </p>
                            <p>
                                <b>Date: </b>
                                <span>May 20, 2019</span>
                            </p>
                        </div>
                        <div className="concert-part-b">
                            <p>
                                <b>Venue: </b>
                                <span>Honda Center</span>
                            </p>
                            <p>
                                <b>Location: </b>
                                <span>Anaheim, CA</span>
                            </p>
                        </div>
                    </div>
                    <div className="buttons"><button className="white-btn">DETAILS</button></div>
                    <div className='hr'><hr /></div>
                </div>
                <div className="concert-result-container">
                    <div className="concert-results">
                        <div className="concert-part-a">
                            <p>
                                <b>Concert: </b>
                                <span>Taylor Swift</span>
                            </p>
                            <p>
                                <b>Date: </b>
                                <span>May 20, 2019</span>
                            </p>
                        </div>
                        <div className="concert-part-b">
                            <p>
                                <b>Venue: </b>
                                <span>Honda Center</span>
                            </p>
                            <p>
                                <b>Location: </b>
                                <span>Anaheim, CA</span>
                            </p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="white-btn">DETAILS</button>
                    </div>
                    <div className='hr'><hr /></div>
                </div>

                <div className="concert-result-container">
                    <div className="concert-results">
                        <div className="concert-part-a">
                            <p>
                                <b>Concert: </b>
                                <span>Taylor Swift</span>
                            </p>
                            <p>
                                <b>Date: </b>
                                <span>May 20, 2019</span>
                            </p>
                        </div>
                        <div className="concert-part-b">
                            <p>
                                <b>Venue: </b>
                                <span>Honda Center</span>
                            </p>
                            <p>
                                <b>Location: </b>
                                <span>Anaheim, CA</span>
                            </p>
                        </div>
                    </div>
                    <div className="buttons"><button className="white-btn">DETAILS</button></div>
                    <div className='hr'><hr /></div>
                </div>
                <div className="buttons"><button className="pink-btn">SEE MORE RESULTS</button></div>
            </div >
        );
    }
}

export default ConcertResults;