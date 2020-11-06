import axios from 'axios';
import { FETCH_USER, FETCH_BEERS, FETCH_BREWERIES, FETCH_TYPES, FETCH_COUNTRIES } from './types';

/* Users */

export const fetchUser = () => async dispatch => {

    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};


/* Beers */

export const submitBeer = (values, history) => async dispatch => {
    const res = await axios.post('/api/beers', values);

    history.push('/beers');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBeers = () => async dispatch => {
    const res = await axios.get('/api/beers');
    dispatch({ type: FETCH_BEERS, payload: res.data });
}


/* Types */
export const fetchTypes = () => async dispatch => {
    const res = await axios.get('/api/types');
    dispatch({ type: FETCH_TYPES, payload: res.data });
}

export const submitType = (values, history) => async dispatch => {
    const res = await axios.post('/api/types', values);

    history.push('/types');
    dispatch({ type: FETCH_USER, payload: res.data });
};


/* Breweries */

export const fetchBreweries = () => async dispatch => {
    const res = await axios.get('/api/breweries');
    dispatch({ type: FETCH_BREWERIES, payload: res.data });
}

export const submitBrewery = (values, history) => async dispatch => {
    const res = await axios.post('/api/breweries', values);
    console.log('VALUES', values);

    history.push('/breweries');
    dispatch({ type: FETCH_USER, payload: res.data });
};


/* Counties */
export const fetchCountries = () => async dispatch => {
    const res = await axios.get('/api/countries');
    dispatch({ type: FETCH_COUNTRIES, payload: res.data });
}

export const submitCountry = (values, history) => async dispatch => {
    const res = await axios.post('/api/countries', values);
    history.push('/countries');
    dispatch({ type: FETCH_USER, payload: res.data });
};