import { FETCH_PREVIOUS_RATING, FETCH_RATINGS_FOR_BEER } from '../actions/types';

export default function ratingsReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PREVIOUS_RATING:
            return action.payload || null;
        case FETCH_RATINGS_FOR_BEER:
            return action.payload || null;
        default:
            return state;
    }
    
}
