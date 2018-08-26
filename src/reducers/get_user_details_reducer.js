import types from '../actions/types';

const DEFAULT_STATE = {
   details: {}
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.GET_USER_DETAILS:
        const tripObject = action.payload.data.data[0];
            return {
                ...state, 
                details: tripObject,
            }
        default:
            return state;
        }
    }