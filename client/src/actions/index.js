import axios from 'axios';
import { FETCH_USER, FETCH_BEERS, FETCH_BREWERIES } from './types';

export const fetchUser = () => async dispatch => {

    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBeer = (values, history) => async dispatch => {
    const res = await axios.post('/api/beers', values);

    history.push('/beers');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBeers = () => async dispatch => {
    const res = await axios.get('/api/beers');
    dispatch({ type: FETCH_BEERS, payload: res.data });
}

export const fetchBreweries = () => async dispatch => {
    const res = await axios.get('/api/breweries');
    dispatch({ type: FETCH_BREWERIES, payload: res.data });
}

export const submitBrewery = (values, history) => async dispatch => {
    const res = await axios.post('/api/breweries', values);

    history.push('/breweries');
    dispatch({ type: FETCH_USER, payload: res.data });
};