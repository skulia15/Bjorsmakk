import { FETCH_BEERS, FETCH_SINGLE_BEER, FETCH_BEERS_FOR_BREWERY } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_BEERS:
      return action.payload || null;
    case FETCH_SINGLE_BEER:
      return action.payload || null;
    case FETCH_BEERS_FOR_BREWERY:
      return action.payload || null;
    default:
      return state;
  }
}
