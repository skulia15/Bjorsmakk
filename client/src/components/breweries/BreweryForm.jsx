// import validateEmails from '../../utils/validateEmails'
import { reduxForm } from "redux-form";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../button/Button";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import { fetchCountries } from "../../actions";

import styles from "../Form.module.scss";

class BreweryForm extends Component {
  componentDidMount() {
    this.props.fetchCountries();
  }

  render() {
    return (
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>Skrá Brugghús</div>

        <form
          name="breweryForm"
          className={styles.standardForm}
          onSubmit={this.props.handleSubmit(this.props.onBrewerySubmit)}
          ref={(ref) => {
            this.form = ref;
          }}
        >
          <div className={styles.inputsContainer}>
            <TextInput
              placeholder=""
              label="Brugghús"
              name="name"
            ></TextInput>
            <SelectInput
              label="Upprunaland"
              name="country"
              options={this.props.countries}
              optionKey="name"
              valueKey="_id"
            ></SelectInput>
          </div>

          <div className={styles.buttonContainer}>
            <Link to="/breweries">
              <Button
                onClick={() => this.nextPath("/breweries")}
                buttonText="Hætta við"
                type="cancel"
              ></Button>
            </Link>

            <a
              href="/breweries"
              onClick={() => {
                this.form.dispatchEvent(new Event("submit"));
              }}
            >
              <Button
                buttonText="Skrá brugghús"
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

function mapStateToProps({ auth, countries }) {
  return { auth, countries };
}

BreweryForm = connect(mapStateToProps, { fetchCountries })(BreweryForm);

export default reduxForm({
  form: "breweryForm",
  destroyOnUnmount: false,
})(BreweryForm);
