import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import reduxPromise from 'redux-promise';


import AcceptancePage from './components/acceptance-page'

const store = createStore(rootReducer, {}, applyMiddleware(reduxPromise));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

