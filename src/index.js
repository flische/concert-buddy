import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import reduxPromise from 'redux-promise';
import think from './middleware/think';
import types from './actions/types';
import TeamPage from './components/team-page';
import AcceptancePage from './components/acceptance-page'
import AboutPage from './components/about';
import App from './components/app';

const store = createStore(rootReducer, {}, applyMiddleware(think, reduxPromise));


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

