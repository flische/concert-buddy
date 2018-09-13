import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './404.css'
import image from './404.jpg'
import tape from './tape.png'


class NotFound extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        document.querySelector('#menuToggle').classList.add('hideNav')
    }
    render(){
        const center = {
            color: 'lightblue'
        }
        return (
            <div>
                <div className="center">
                    <h1>404 Error Page Not Found</h1>
                    <Link style={center} to="/">Return To Home Page </Link>
                    <img className="img404" src={tape} /><br />
                </div>
            </div>
        )
    }
}

export default NotFound;