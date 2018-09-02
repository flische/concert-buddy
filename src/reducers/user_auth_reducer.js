import types from '../actions/types';

const DEFAULT_STATE = {
    auth: false,
    error: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.AUTH_ERROR:
            return { auth: false, error: action.error };
        case types.SIGN_UP:    
        case types.SIGN_IN:
            return { auth: true, error: '' };
        case types.SIGN_OUT:
            return { auth: false, error: '' };    
        default:
            return state;
    }
};