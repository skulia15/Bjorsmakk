// import validateEmails from '../../utils/validateEmails'
import { reduxForm } from "redux-form";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import FormField from './FormField';
import { Link } from "react-router-dom";
// import beerFormFields from './beerFormFields';
// import _ from 'lodash';
import { connect } from "react-redux";
import styles from "../Form.module.scss";
import TextInput from "../inputs/TextInput";
import NumberInput from "../inputs/NumberInput";
import Button from "../Button";
import { compose } from "redux";
class BeerForm extends Component {
  // renderFields() {
  //     return _.map(beerFormFields, ({ label, name }) => {
  //         return (
  //             <Field component={FormField} type="text" label={label} name={name} key={name} />
  //         )
  //     });
  // }
  nextPath(path) {
    console.log(path);
    this.props.history.push(path);
  }
  render() {
    return (
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>Skrá Bjór</div>
        <form
          className={styles.standardForm}
          onSubmit={this.props.handleSubmit(this.props.onBeerSubmit)}
        >
          <div className={styles.inputsContainer}>
            <TextInput placeholder="Nafn" label="Nafn"></TextInput>
            <NumberInput label="Prósenta% (dæmi: 4.5 )"></NumberInput>
          </div>

          <div className={styles.buttonContainer}>
            {/* todo: clickhandler not working */}
            <Link to="/beers">
              <Button
                onClick={() => this.nextPath("/beers")}
                buttonText="Hætta við"
                type="cancel"
              ></Button>
            </Link>

            <Button
              buttonText="Áfram"
              iconName="arrow_forward"
              type="success"
            ></Button>
          </div>
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

export default compose(
  withRouter,
  reduxForm({
    // validate,
    form: "beerForm",
    destroyOnUnmount: false,
  })
)(BeerForm);
