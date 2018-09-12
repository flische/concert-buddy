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
import App from './components/app';
import {formatPostData} from './helpers'


const store = createStore(rootReducer, {}, applyMiddleware(think, reduxPromise));

// ***Persistent login*** // 
//wraps the entire application as soon as store is created the first time (right above) and checks if user is logged in
if(document.cookie){ // if a cookie exists in the session storage...
    // In order to log in, we need to send an action to the reducer! What’s the method that sends actions out? dispatch() !
    store.dispatch({ type: types.SIGN_IN} ); // change auth to true for the moment ...then...

    const dataToSend = {
        action: 'existing_login',
    }
     const params = formatPostData(dataToSend);
     axios.post('api/handle_login.php', params).then((response) => { // check if user is actually logged in..then...
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

