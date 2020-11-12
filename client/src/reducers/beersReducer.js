import { FETCH_BEERS, FETCH_SINGLE_BEER } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_BEERS:
            return action.payload || [];
        case FETCH_SINGLE_BEER:
            return action.payload || null;
        default:
            return state;
    }
}