import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Header from './header/';
import SearchConcerts from './search-concerts/';
import InviteFriends from './invite/';
import Login from './login/';
import Landing from './landing/';
import SignUp from './sign-up/';
import Planner from './planner/';
import ConcertResults from './concert-results/';
import ConcertDetails from './concert-details/';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHome: false
        }
    }
    componentDidMount() {
        // console.log(this.props)
        if(this.props.location.pathname === '/'){
            this.setState({
                isHome: true
            })
        } else {
            this.setState({
                isHome: false
            })
        }
        this.props.history.listen((location) => {
            if(location.pathname === '/'){
                this.setState({
                    isHome: true
                })
            } else {
                this.setState({
                    isHome: false
                })
            }
        })
    }
    render() {
        return (
            <div className='main'>
                {this.state.isHome ? null : <Header />}
                <Route exact path='/' component={Landing} />
                <Route path='/search-concerts' component={SearchConcerts} />
                <Route path='/invite' component={InviteFriends} />
                <Route path='/login' component={Login} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/planner' component={Planner} />


            </div>
        );
    }
}
const appWithRouter = withRouter(App)
export default appWithRouter;

