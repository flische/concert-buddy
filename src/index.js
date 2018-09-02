import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import reduxPromise from 'redux-promise';
import types from './actions/types';

const store = createStore(rootReducer, {}, applyMiddleware(reduxPromise));

if(localStorage.getItem('token')){
    store.dispatch( { type: types.SIGN_IN } );
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

