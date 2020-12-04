import axios from "axios";
import {
  FETCH_USER,
  FETCH_USERS,
  FETCH_BEERS,
  FETCH_SINGLE_BEER,
  FETCH_BREWERIES,
  FETCH_SINGLE_BREWERY,
  FETCH_BEERS_FOR_BREWERY,
  FETCH_TYPES,
  FETCH_COUNTRIES,
  FETCH_EVENTS,
  FETCH_SINGLE_EVENT,
} from "./types";

/* Users */

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUsers = () => async (dispatch) => {
  const res = await axios.get("/api/users");
  dispatch({ type: FETCH_USERS, payload: res.data });
};

/* Beers */

export const submitBeer = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/beers", values);
  history.push("/beers");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBeers = () => async (dispatch) => {
  const res = await axios.get("/api/beers");
  dispatch({ type: FETCH_BEERS, payload: res.data });
};

export const fetchSingleBeer = (id) => async (dispatch) => {
  const res = await axios.get(`/api/beers/${id}`);
  dispatch({ type: FETCH_SINGLE_BEER, payload: res.data });
};

export const fetchBeersForBrewery = (breweryId) => async (dispatch) => {
  const res = await axios.get(`/api/breweries/${breweryId}/beers`);
  dispatch({ type: FETCH_BEERS_FOR_BREWERY, payload: res.data });
};

/* Types */
export const fetchTypes = () => async (dispatch) => {
  const res = await axios.get("/api/types");
  dispatch({ type: FETCH_TYPES, payload: res.data });
};

export const submitType = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/types", values);

  history.push("/types");
  dispatch({ type: FETCH_USER, payload: res.data });
};

/* Breweries */

export const fetchBreweries = () => async (dispatch) => {
  const res = await axios.get("/api/breweries");
  dispatch({ type: FETCH_BREWERIES, payload: res.data });
};

export const fetchSingleBrewery = (id) => async (dispatch) => {
  const res = await axios.get(`/api/breweries/${id}`);
  dispatch({ type: FETCH_SINGLE_BREWERY, payload: res.data });
};

export const submitBrewery = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/breweries", values);

  history.push("/breweries");
  dispatch({ type: FETCH_USER, payload: res.data });
};


/* Countries */
export const fetchCountries = () => async (dispatch) => {
  const res = await axios.get("/api/countries");
  dispatch({ type: FETCH_COUNTRIES, payload: res.data });
};

export const submitCountry = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/countries", values)
  history.push("/countries");
  dispatch({ type: FETCH_USER, payload: res.data });
};

/* Events */
export const fetchEvents = () => async (dispatch) => {
  const res = await axios.get("/api/events");
  dispatch({ type: FETCH_EVENTS, payload: res.data });
};

export const fetchSingleEvent = (id) => async (dispatch) => {
  const res = await axios.get(`/api/events/${id}`);
  dispatch({ type: FETCH_SINGLE_EVENT, payload: res.data });
};

export const submitEvent = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/events", values);
  history.push("/events");
  dispatch({ type: FETCH_USER, payload: res.data });
};
