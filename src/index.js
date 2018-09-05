import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import reduxPromise from 'redux-promise';
import think from './middleware/think';
import types from './actions/types';
import TeamPage from './components/team-page';

const store = createStore(rootReducer, {}, applyMiddleware(think, reduxPromise));

// if(localStorage.getItem('token')){
//     store.dispatch( { type: types.SIGN_IN } );
// }

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <TeamPage />
        </Router>
    </Provider>,
    document.getElementById('root')
);

