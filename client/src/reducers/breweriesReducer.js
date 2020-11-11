import { FETCH_BREWERIES } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_BREWERIES:
            action.payload.push({'name': '--- Ekkert Valið ---', '_id': 0});
            return action.payload;
        default:
            return state;
    }
}