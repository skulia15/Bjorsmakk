import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import breweryFormFields from './breweryFormFields';
import React from 'react';
import _ from 'lodash';

const BreweryFormReview = ({ onCancel, formValues, submitBrewery, history }) => {
    const reviewFields = _.map(breweryFormFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label htmlFor={label}>
                    {label}
                </label>
                <div id={label}>
                    {formValues[name]}
                </div>
            </div>
        );
    })
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}>
                Til baka
            </button>
            <button
                onClick={() => submitBrewery(formValues, history)}
                className="green btn-flat right white-text"
            >
                Staðfesta
                <i className="material-icons right">done</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.breweryForm.values, auth: state.auth };
}

export default connect(mapStateToProps, actions)(withRouter(BreweryFormReview));