import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import beerFormFields from './beerFormFields';
import React from 'react';
import _ from 'lodash';

const BeerFormReview = ({ onCancel, formValues, submitBeer, history }) => {
    const reviewFields = _.map(beerFormFields, ({ name, label }) => {
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
                className=""
                onClick={onCancel}>
                Til baka
            </button>
            <button
                onClick={() => submitBeer(formValues, history)}
                className=""
            >
                Staðfesta
                <i className="material-icons right">done</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.beerForm.values, auth: state.auth };
}

export default connect(mapStateToProps, actions)(withRouter(BeerFormReview));