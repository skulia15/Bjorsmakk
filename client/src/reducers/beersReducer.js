import {
  FETCH_BEERS,
  FETCH_BEERS_SUCCESS,
  FETCH_SINGLE_BEER,
  FETCH_BEERS_FOR_BREWERY,
} from "../actions/types";

export default function beersReducer(state = { beersResponse: [] }, action) {
  switch (action.type) {
    case FETCH_BEERS:
      return { ...state, loading: true };
    case FETCH_BEERS_SUCCESS:
      return { ...state, loading: false, beers: action.payload };
    case FETCH_SINGLE_BEER:
      return action.payload || null;
    case FETCH_BEERS_FOR_BREWERY:
      return action.payload || null;
    default:
      return state;
  }
}
