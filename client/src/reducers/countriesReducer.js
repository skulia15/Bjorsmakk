import { FETCH_COUNTRIES } from '../actions/types';

export default function countriesReducer(state = [], action) {
    switch (action.type) {
        case FETCH_COUNTRIES:
            return action.payload;
        default:
            return state;
    }
}