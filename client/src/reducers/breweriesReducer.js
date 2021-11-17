import { FETCH_BREWERIES, FETCH_SINGLE_BREWERY } from "../actions/types";

export default function breweriesReducer (state = [], action) {
  switch (action.type) {
    case FETCH_BREWERIES:
      return action.payload;
    case FETCH_SINGLE_BREWERY:
      return action.payload || null;
    default:
      return state;
  }
}
