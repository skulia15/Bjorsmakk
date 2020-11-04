// import validateEmails from '../../utils/validateEmails'
import { reduxForm, Field } from 'redux-form';
import React, { Component } from 'react';
import FormField from './FormField';
import {Link} from 'react-router-dom';
import beerFormFields from './beerFormFields';
import _ from 'lodash';
import { connect } from 'react-redux';


class BeerForm extends Component {
    renderFields() {
        return _.map(beerFormFields, ({ label, name }) => {
            return (
                <Field component={FormField} type="text" label={label} name={name} key={name} />
            )
        });
    }
    render() {

        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onBeerSubmit)}>
                    {this.renderFields()}
                    <Link to="/beers" className="">
                        Hætta við
                    </Link>
                    <button type="submit" className="">
                        Áfram
                        <i className="material-icons">arrow_forward</i>
                    </button>
                </form>
            </div>
        );
    }
}

// function validate(values) {
//     const errors = {};

//     errors.recipients = validateEmails(values.recipients || '');

//     _.each(formFields, ({name, noValueError}) => {
//         if(!values[name]) {
//             errors[name] = noValueError;
//         }
//     });
//     return errors;
// }

function mapStateToProps({ auth }) {
    return { auth };
}

BeerForm = connect(mapStateToProps)(BeerForm);

export default reduxForm({
    // validate,
    form: 'beerForm',
    destroyOnUnmount: false
})(BeerForm);