// import validateEmails from '../../utils/validateEmails'
import { reduxForm, change as changeFieldValue } from "redux-form";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../button/Button";

import TextInput from "../inputs/TextInput";

import styles from "../Form.module.scss";
import { fetchUsers, fetchBeers } from "../../actions";
import * as multiselectReactDropdown from "multiselect-react-dropdown";
import formStyle from "../Form.module.scss";

class EventForm extends Component {
  constructor() {
    super();
    this.handleBeerSelectChange = this.handleBeerSelectChange.bind(this);
    this.handleUserSelectChange = this.handleUserSelectChange.bind(this);
  }
  state = {
    selectedUserValues: [],
    selectedBeerValues: [],
    options: [{ name: "Hleður gögnum", id: 1 }],
  };
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchBeers();
  }

  handleBeerSelectChange(selected) {
    if (changeFieldValue) {
      this.props.dispatch(changeFieldValue("eventForm", "beer", selected));
    }
  }

  handleUserSelectChange(selected) {
    if (changeFieldValue) {
      this.props.dispatch(changeFieldValue("eventForm", "user", selected));
    }
  }
  // TODO: Fix, bad practice - somehow move to modules 
  dropdownStyle = {
    multiselectContainer: {
      color: "#242525"
    }
  };

  render() {
    return (
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>Skrá Viðburð</div>

        <form
          name="eventForm"
          className={styles.standardForm}
          onSubmit={this.props.handleSubmit(this.props.onEventSubmit)}
          ref={(ref) => {
            this.form = ref;
          }}
        >
          <div className={styles.inputsContainer}>
            <TextInput placeholder="" label="Nafn" name="name"></TextInput>

            <div className={`${formStyle.form__group}`}>
              <div className={formStyle.form__label}>Þáttakendur</div>
              <multiselectReactDropdown.Multiselect
                options={
                  this.props.users
                    ? this.props.users.map((user) => ({
                        name: user.name,
                        id: user._id,
                      }))
                    : this.state.options
                } // Options to display in the dropdown
                selectedValues={this.state.selectedUserValues} // Preselected value to persist in dropdown
                displayValue="name" // Property name to display in the dropdown options
                onSelect={this.handleUserSelectChange}
                style={this.dropdownStyle}
              />
            </div>

            <div className={`${formStyle.form__group}`}>
              <div className={formStyle.form__label}>Bjórar</div>

              <multiselectReactDropdown.Multiselect
                options={
                  this.props.beers && this.props.beers.length
                    ? this.props.beers.map((beer) => ({
                        name: beer.name,
                        id: beer._id,
                      }))
                    : this.state.options
                } // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                displayValue="name" // Property name to display in the dropdown options
                onSelect={this.handleBeerSelectChange}
                style={this.dropdownStyle}
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Link to="/events">
              <Button
                onClick={() => this.nextPath("/events")}
                buttonText="Hætta við"
                buttonType="cancel"
              ></Button>
            </Link>

            <a
              href="/events"
              onClick={() => {
                this.form.dispatchEvent(new Event("submit"));
              }}
            >
              <Button
                buttonText="Skrá Viðburð"
                iconName="arrow_forward"
                buttonType="success"
              ></Button>
            </a>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth, users, beers }) {
  beers = beers.beers;
  return { auth, users, beers };
}

EventForm = connect(mapStateToProps, { fetchUsers, fetchBeers })(EventForm);

export default reduxForm({
  form: "eventForm",
  destroyOnUnmount: false,
})(EventForm);
