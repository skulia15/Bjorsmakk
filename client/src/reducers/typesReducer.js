import { FETCH_TYPES } from '../actions/types';

export default function typesReducer(state = [], action) {
    switch (action.type) {
        case FETCH_TYPES:
            return action.payload;
        default:
            return state;
    }
}