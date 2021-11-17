import axios from "axios";
import {
  FETCH_USER,
  FETCH_USERS,
  // FETCH_BEERS,
  FETCH_BEERS_SUCCESS,
  FETCH_SINGLE_BEER,
  FETCH_BREWERIES,
  FETCH_SINGLE_BREWERY,
  FETCH_BEERS_FOR_BREWERY,
  FETCH_TYPES,
  FETCH_COUNTRIES,
  FETCH_EVENTS,
  FETCH_SINGLE_EVENT,
  FETCH_PREVIOUS_RATING,
  FETCH_RATINGS_FOR_BEER,
} from "./types";

/* Users */

export const fetchUser = () => async (dispatch) => {
  console.log("fetchUser");

  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUsers = () => async (dispatch) => {
  console.log("fetchUsers");

  const res = await axios.get("/api/users");
  dispatch({ type: FETCH_USERS, payload: res.data });
};

/* Beers */
export const fetchBeers = () => async (dispatch) => {
  console.log("fetchBeers");

  await axios.get("/api/beers").then((res) => {
    dispatch({
      type: FETCH_BEERS_SUCCESS,
      payload: res.data,
    })
  });
};

export const fetchSingleBeer = (id) => async (dispatch) => {
  console.log("fetchSingleBeer");

  const res = await axios.get(`/api/beers/${id}`);
  dispatch({ type: FETCH_SINGLE_BEER, payload: res.data });
};

export const submitBeer = (values, history) => async (dispatch) => {
  console.log("submitBeer");

  const res = await axios.post("/api/beers", values);
  history.push("/beers");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const editBeer = (id, values, history) => async () => {
  console.log("editBeer");

  await axios.put(`/api/beers/${id}`, values);
  history.push(`/beers/${id}`);
};

export const deleteBeer = (id, history) => async () => {
  console.log("deleteBeer");

  await axios.delete(`/api/beers/${id}`);
  history.push(`/beers/`);
};

export const fetchBeersForBrewery = (breweryId) => async (dispatch) => {
  console.log("fetchBeersForBrewery");

  const res = await axios.get(`/api/breweries/${breweryId}/beers`);
  dispatch({ type: FETCH_BEERS_FOR_BREWERY, payload: res.data });
};

/* Types */
export const fetchTypes = () => async (dispatch) => {
  console.log("fetchTypes");

  const res = await axios.get("/api/types");
  dispatch({ type: FETCH_TYPES, payload: res.data });
};

export const submitType = (values, history) => async (dispatch) => {
  console.log("submitType");

  const res = await axios.post("/api/types", values);

  history.push("/types");
  dispatch({ type: FETCH_USER, payload: res.data });
};

/* Breweries */

export const fetchBreweries = () => async (dispatch) => {
  console.log("fetchBreweries");

  const res = await axios.get("/api/breweries");
  dispatch({ type: FETCH_BREWERIES, payload: res.data });
};

export const fetchSingleBrewery = (id) => async (dispatch) => {
  console.log("fetchSingleBrewery");

  const res = await axios.get(`/api/breweries/${id}`);
  dispatch({ type: FETCH_SINGLE_BREWERY, payload: res.data });
};

export const submitBrewery = (values, history) => async (dispatch) => {
  console.log("submitBrewery");

  const res = await axios.post("/api/breweries", values);

  history.push("/breweries");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const editBrewery = (id, values, history) => async () => {
  console.log("editBrewery");

  await axios.put(`/api/breweries/${id}`, values);
  history.push(`/breweries/${id}`);
};

/* Countries */
export const fetchCountries = () => async (dispatch) => {
  console.log("fetchCountries");

  const res = await axios.get("/api/countries");
  dispatch({ type: FETCH_COUNTRIES, payload: res.data });
};

export const submitCountry = (values, history) => async (dispatch) => {
  console.log("submitCountry");

  const res = await axios.post("/api/countries", values);
  history.push("/countries");
  dispatch({ type: FETCH_USER, payload: res.data });
};

/* Events */
export const fetchEvents = () => async (dispatch) => {
  console.log("fetchEvents");

  const res = await axios.get("/api/events");
  dispatch({ type: FETCH_EVENTS, payload: res.data });
};

export const fetchSingleEvent = (id) => async (dispatch) => {
  console.log("fetchSingleEvent");

  const res = await axios.get(`/api/events/${id}`);
  dispatch({ type: FETCH_SINGLE_EVENT, payload: res.data });
};

export const submitEvent = (values, history) => async (dispatch) => {
  console.log("submitEvent");

  const res = await axios.post("/api/events", values);
  history.push("/events");
  dispatch({ type: FETCH_USER, payload: res.data });
};

/* Ratings */

export const fetchRatingsForBeer = (id) => async (dispatch) => {
  console.log("fetchRatingsForBeer");

  const res = await axios.get(`/api/ratings/${id}`);
  dispatch({ type: FETCH_RATINGS_FOR_BEER, payload: res.data });
};

export const fetchPreviousRating = ({ beerId, eventId, ratedById }) => async (
  dispatch
) => {
  console.log("fetchPreviousRating");

  const res = await axios.get(`/api/ratings/${beerId}/previousRating`, {
    params: { eventId, ratedById },
  });
  dispatch({ type: FETCH_PREVIOUS_RATING, payload: res.data });
};

export const rateBeer = (values) => async (dispatch) => {
  console.log("rateBeer");

  const res = await axios.post(`/api/ratings`, values);
  dispatch({ type: FETCH_PREVIOUS_RATING, payload: res.data });
};
