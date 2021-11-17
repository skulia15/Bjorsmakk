import { FETCH_USERS } from '../actions/types';

export default function usersReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USERS:
            return action.payload || null;
        default:
            return state;
    }
    
}
