import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (WrappedComponent, path ='/'){
    class Auth extends Component {
        componentDidMount(){
            this.checkAuth();
            console.log("here");
        }
        componentDidUpdate(){
            this.checkAuth();
        }
        checkAuth(){
            const { auth, history } = this.props;

            if(!auth){
                history.push(path);
            }
        }
        render(){
            console.log('Auth props: ', this.props);
            return <WrappedComponent {...this.props}/>;
        }
    }
    
    function  mapStateToProps(state){
        return {
            auth: state.userAuth.auth
        }
    }
    return connect(mapStateToProps)(Auth);
}