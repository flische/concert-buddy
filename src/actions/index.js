import types from './types';
import axios from 'axios';
import { formatPostData } from '../helpers'


export function get_concert_details(object) {
    var URL = 'https://app.ticketmaster.com/discovery/v2/events.jsonp?apikey=86PZJxmHAum8VeEH8EJBOCjucnSAVyGR';
    if (object.id) {
        URL = URL + '&id=' + object.id;
    }
    const resp = axios.get(URL);

    return {
        type: types.GET_CONCERT_DETAILS,
        payload: resp
    }
}

export async function get_user_details() {
    // const dataToSend = {
    //     userID: userID,
    // }
    // const params = formatPostData(dataToSend)
    const userTrips = await axios.post('api/checkUserTrips.php');
    console.log('get_user_details actions/index.js: ', userTrips);
    const id = userTrips.data.data[0].trip_id;

    if(id === null || id === undefined){
        return
    }
    
    var dataToSend2 = {
        tripID: id,
    }
    const params2 = formatPostData(dataToSend2);
    const going = await axios.post('api/checkWhosGoing.php', params2)
    const whosgoing = going.data.data;
    const payload = {
        userTrips: userTrips,
        whosgoing: whosgoing
    };
    return {
        type: types.GET_USER_DETAILS,
        payload: payload
    }
}

export async function send_email_invites(emails) {
    const dataToSend = {
        emails: emails,
        trip: 1,
    }
    const params = JSON.stringify(dataToSend)
    console.log(params);
    const response = await axios.post('api/emailInviteFriends.php', params);
    return {
        type: types.SEND_INVITES,
        payload: response
    }
}

export async function create_trip(trip) {
    return {
        type: types.CREATE_TRIP,
        payload: response
    };
}

export async function delete_responsibility(id){
      return {
        type: types.DELETE_RESPONSIBILITY,
    }
}


export const signIn = credentials => async dispatch => {
    
    try {
        console.log("here");
        const { email, password } = credentials;

        const dataToSend = {
            email: email,
            password: password
        };
        const params = formatPostData(dataToSend);
       
        const response = await axios.post('api/loginCheck.php', params);

        if (response.data.success) {
            dispatch({ type: types.SIGN_IN} );
    
        } else {
            dispatch({
                type: types.AUTH_ERROR,
                error: 'Invalid email and/or password'
            });
        }
    } catch (error) {
        dispatch({
            type: types.AUTH_ERROR,
            error: 'Invalid email and/or password'
        });
    }
}

export const signUp = credentials => async dispatch => {
    try {
        const dataToSend = {
            email: email,
            name: name,
            password: password  
            };
        const credentials = formatPostData(dataToSend);
        const resp = await axios.post('api/addUser.php', credentials);
        console.log('Sign Up response: ', response);
        if (resp.data.success) {

            dispatch({ type: types.SIGN_UP} );
        } else {
            dispatch({
                type: types.AUTH_ERROR,
                error: 'Error creating account'
            });
        }

    } catch(error){
        dispatch( {
            type: types.AUTH_ERROR,
            error: 'Error creating account'
        });
    }   
}

export async function signOut(){
    await axios.post('api/logout.php');
    return { type: types.SIGN_OUT };
};