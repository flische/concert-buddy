import React from 'react';
import { Route } from 'react-router-dom';
import Header from './header/';
import SearchConcerts from './search-concerts/';
import InviteFriends from './invite/';
import Login from './login/';
import Landing from './landing/';
import SignUp from './sign-up/';
import Planner from './planner/';

const App = () => {
    return (
        <div className='main'>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route path='/search-concerts' component={SearchConcerts} />
            <Route path='/invite' component={InviteFriends} />
            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/planner' component={Planner} />

        </div>
    );
}

export default App;

