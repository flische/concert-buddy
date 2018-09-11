import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import concertDetailsReducer from './get_concert_detail_reducer';
import userDetailsReducer from './get_user_details_reducer';
import user_auth_reducer from './user_auth_reducer';

const appReducer = combineReducers(
    {   
        concertDetails: concertDetailsReducer,
        user: userDetailsReducer,
        userAuth: user_auth_reducer,
        form: formReducer
    }
);

const rootReducer = (state, action) => {
    // console.log('action type: ', action.type);
    if (action.type === 'sign_out') {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;
