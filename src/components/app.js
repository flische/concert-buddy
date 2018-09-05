import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom'
import Header from './header/';
import SearchConcerts from './search-concerts/';
import InviteFriends from './invite/';
import SignIn from './login/sign_in';
import Landing from './landing/';
import SignUp from './sign-up/';
import Planner from './planner/';
import ConcertResults from './concert-results/';
import ConcertDetails from './concert-details/';
import NotFound from '../components/404';
import NewTrip1 from '../components/new-trip-1';
import Responsibilities from '../components/responsibility-board';
import AddResponsibility from '../components/add-responsibility';
import auth from '../hoc/auth';
import redirect from '../hoc/redirect';
import EditResponsibility from '../components/edit-responsibility';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHome: false
        }
    }
    componentDidMount() {
        if (this.props.location.pathname === '/') {
            this.setState({
                isHome: true
            })
        } else {
            this.setState({
                isHome: false
            })
        }
        this.props.history.listen((location) => {
            if (location.pathname === '/') {
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
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route path='/search-concerts' component={SearchConcerts} />
                    <Route path='/concert-results' component={ConcertResults} />
                    <Route path='/concert-details' component={ConcertDetails} />
                    <Route path='/invite' component={InviteFriends} />
                    <Route path='/sign-in' component={redirect(SignIn, '/')} />
                    <Route path='/sign-up' component={redirect(SignUp, '/sign-in')} />
                    <Route path='/planner' component={auth(Planner)} />
                    <Route path='/new-trip-1' component={NewTrip1} />
                    <Route path='/responsibilities' component={auth(Responsibilities)} />
                    <Route path='/add-responsibility' component={auth(AddResponsibility)} />
                    <Route path='/edit-responsibility' component={EditResponsibility} />
                    <Route component={redirect(NotFound, '/')} />

                </Switch>
            </div>
        );
    }
}
const appWithRouter = withRouter(App)
export default appWithRouter;
