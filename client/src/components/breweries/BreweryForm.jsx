// import validateEmails from '../../utils/validateEmails'
import { reduxForm, Field } from 'redux-form';
import React, { Component } from 'react';
import FormField from './FormField';
import {Link} from 'react-router-dom';
import breweryFormFields from './breweryFormFields';
import _ from 'lodash';
import { connect } from 'react-redux';
import styles from '../Form.module.scss';

class BreweryForm extends Component {
    renderFields() {
        return _.map(breweryFormFields, ({ label, name }) => {
            return (
                <Field component={FormField} type="text" label={label} name={name} key={name} />
            )
        })
    }
    render() {

        return (
            <div>
                <form className={styles.standardForm} onSubmit={this.props.handleSubmit(this.props.onBrewerySubmit)}>
                    {this.renderFields()}
                    <Link to="/breweries" className="">
                        Hætta við
                    </Link>
                    <button type="submit" className="">
                        Áfram
                        <i className="material-icons right">arrow_forward</i>
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

BreweryForm = connect(mapStateToProps)(BreweryForm);

export default reduxForm({
    // validate,
    form: 'breweryForm',
    destroyOnUnmount: false
})(BreweryForm);