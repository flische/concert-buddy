import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import concertDetailsReducer from './get_concert_detail_reducer';
import userDetailsReducer from './get_user_details_reducer';


export default combineReducers(
    {
        //concertDetails could be named whatever you want - it just needs to have a value of the reducer that you import
        concertDetails: concertDetailsReducer,

        user: userDetailsReducer

        form: formReducer

    }
);