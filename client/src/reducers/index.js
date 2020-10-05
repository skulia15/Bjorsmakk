import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import beersReducer from './beersReducer';
import breweriesReducer from './breweriesReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    beers: beersReducer,
    breweries: breweriesReducer
});
