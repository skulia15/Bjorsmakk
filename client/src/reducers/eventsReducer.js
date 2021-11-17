import { FETCH_EVENTS, FETCH_SINGLE_EVENT } from '../actions/types';

export default function eventsReducer(state = null, action) {
    switch (action.type) {
        case FETCH_EVENTS:
            return action.payload || null;
        case FETCH_SINGLE_EVENT:
            return action.payload || null;
        default:
            return state;
    }
    
}
