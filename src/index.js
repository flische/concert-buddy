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

const store = createStore(rootReducer, {}, applyMiddleware(think, reduxPromise));

// ***Persistent login*** // 
//wraps the entire application as soon as store is created the first time (right above) and checks if user is logged in
const response =  axios.post('api/checkUserLoggedIn.php').then((response) => { // checks if user is logged in..then...
    console.log('response', response);

    if (response.data.success) {  // <--- .then( is used to check if user is in fact logged in...
    // In order to log in, we need to send an action to the reducer! What’s the method that sends actions out? dispatch() !
        store.dispatch({ type: types.SIGN_IN} );  // if user IS logged in, store.dispatch() -> the SIGN_IN action! 
    } 
});


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

