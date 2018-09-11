import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import rootReducer from './reducers/index';
import reduxPromise from 'redux-promise';
import think from './middleware/think';
import types from './actions/types';
import TeamPage from './components/team-page';
import AcceptancePage from './components/acceptance-page'
import AboutPage from './components/about';
import auth from './hoc/auth';
import App from './components/app';


const store = createStore(rootReducer, {}, applyMiddleware(think, reduxPromise));

// ***Persistent login*** // 
//wraps the entire application as soon as store is created the first time (right above) and checks if user is logged in
if(document.cookie){ // if a cookie exists in the session storage...
    console.log('cookie', document.cookie);
    // In order to log in, we need to send an action to the reducer! What’s the method that sends actions out? dispatch() !
    store.dispatch({ type: types.SIGN_IN} ); // change auth to true for the moment ...then...
    dataToSend = {
        action: 'exisiting_login',
    }
    const response =  axios.post('api/handle_login.php').then((response) => { // check if user is actually logged in..then...
        console.log('response', response);
        if (!response.data.success) {  // if user is NOT logged in...
            store.dispatch({ type: types.SIGN_OUT }); // sign out user!
        }
    });
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

