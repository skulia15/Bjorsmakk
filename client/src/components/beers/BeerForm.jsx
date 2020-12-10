import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm } from "redux-form";
import { change as changeFieldValue } from "redux-form";

import { Multiselect } from "multiselect-react-dropdown";
import NumberInput from "../inputs/NumberInput";
import SelectInput from "../inputs/SelectInput";
import TextInput from "../inputs/TextInput";
import Button from "../button/Button";

import { fetchTypes, fetchBreweries } from "../../actions";

import formStyle from "../Form.module.scss";
import styles from "../Form.module.scss";

class BeerForm extends Component {
  constructor() {
    super();
    this.handleMultiselectChange = this.handleMultiselectChange.bind(this);
  }
  state = {
    selectedTypesValues: [],
  };
  nextPath(path) {
    this.props.history.push(path);
  }
  componentDidMount() {
    this.props.fetchTypes();
    this.props.fetchBreweries();
  }

  handleMultiselectChange(selected) {
    if (changeFieldValue) {
      this.props.dispatch(changeFieldValue("beerForm", "type", selected));
    }
  }
  render() {
    return (
      <div className={`${styles.formContainer} ${styles.formContainer__centered}`}>
        <div className={styles.formHeader}>Skrá Bjór</div>

        <form
          name="beerForm"
          className={styles.standardForm}
          onSubmit={this.props.handleSubmit(this.props.onBeerSubmit)}
          ref={(ref) => {
            this.form = ref;
          }}
        >
          <div className={styles.inputsContainer}>
            <TextInput placeholder="Nafn" label="Nafn" name="name"></TextInput>
            <NumberInput
              label="Prósenta % (dæmi: 4.5 )"
              name="percentage"
            ></NumberInput>
            <div className={`${formStyle.form__group}`}  style={{ maxWidth: "290px" }}>
              <label className={formStyle.form__label}>Bjórflokkur</label>
              <Multiselect
                options={this.props.types} // Options to display in the dropdown
                selectedValues={this.state.selectedTypesValues} // Preselected value to persist in dropdown
                displayValue="typeName" // Property name to display in the dropdown options
                onSelect={this.handleMultiselectChange}
              />
            </div>
            <SelectInput
              label="Brugghús"
              name="brewery"
              options={this.props.breweries}
              optionKey="name"
              valueKey="_id"
            ></SelectInput>
          </div>

          <div className={styles.buttonContainer}>
            {/* todo: clickhandler not working */}
            <Link to="/beers">
              <Button buttonText="Hætta við" type="cancel"></Button>
            </Link>

            <a
              href="/beers"
              onClick={() => {
                this.form.dispatchEvent(new Event("submit"));
              }}
            >
              <Button
                buttonText="Skrá Bjór"
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

function mapStateToProps({ auth, types, breweries }) {
  return { auth, types, breweries };
}

BeerForm = connect(mapStateToProps, { fetchTypes, fetchBreweries })(BeerForm);

export default compose(
  withRouter,
  reduxForm({
    form: "beerForm",
    destroyOnUnmount: false,
    enableReinitialize: true,
  })
)(BeerForm);
