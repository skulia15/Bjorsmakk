import { FETCH_BREWERIES } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_BREWERIES:
            return action.payload;
        default:
            return state;
    }
}