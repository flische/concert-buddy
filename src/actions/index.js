import types from './types';
import axios from 'axios';
import {formatPostData} from '../helpers'


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


export async function get_user_details(userID) {
        const dataToSend = {
            userID: userID,
          }
          const params = formatPostData(dataToSend)
          
         const userTrips  =  await axios.post('api/checkUserTrips.php', params);
          return {
              type: types.GET_USER_DETAILS,
              payload: userTrips
          }

}


export async function create_trip(trip){


    // const response = await axios.post('api/createTrip.php', trip);
    
    return {
        type: types.CREATE_TRIP,
        payload: response
    };
}





