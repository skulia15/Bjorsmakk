// import validateEmails from '../../utils/validateEmails'
import { reduxForm } from "redux-form";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../Button";
import TextInput from "../inputs/TextInput";

import styles from "../Form.module.scss";

class CountryForm extends Component {
  render() {
    return (
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>Skrá Land</div>

        <form
          name="countryForm"
          className={styles.standardForm}
          onSubmit={this.props.handleSubmit(this.props.onCountrySubmit)}
          ref={(ref) => {
            this.form = ref;
          }}
        >
          <div className={styles.inputsContainer}>
            <TextInput
              placeholder=""
              label="Land"
              name="name"
            ></TextInput>
          </div>

          <div className={styles.buttonContainer}>
            <Link to="/types">
              <Button
                onClick={() => this.nextPath("/types")}
                buttonText="Hætta við"
                type="cancel"
              ></Button>
            </Link>

            <a
              onClick={() => {
                this.form.dispatchEvent(new Event("submit"));
              }}
            >
              <Button
                buttonText="Skrá Land"
                iconName="arrow_forward"
                type="success"
              ></Button>
            </a>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

CountryForm = connect(mapStateToProps)(CountryForm);

export default reduxForm({
  form: "countryyForm",
  destroyOnUnmount: false,
})(CountryForm);
