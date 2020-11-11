// import validateEmails from '../../utils/validateEmails'
import { reduxForm } from "redux-form";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../button/Button";

import TextInput from "../inputs/TextInput";

import styles from "../Form.module.scss";
import { fetchUsers, fetchBeers } from "../../actions";
import { Multiselect } from "multiselect-react-dropdown";
import formStyle from "../Form.module.scss";

class EventForm extends Component {
  state = {
    selectedUserValues: [],
    selectedBeerValues: [],
    options: [{ name: "Hleður gögnum", id: 1 }],
  };
  componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchBeers();
  }
  onSelect(selectedList, selectedItem) {
    console.log("selectedList", selectedList);
    console.log("selectedItem", selectedItem);
  }

  onRemove(selectedList, removedItem) {
    console.log("selectedList", selectedList);
  }
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
              <Multiselect
                options={
                  this.props.users
                    ? this.props.users.map((user) => ({
                        name: user.name,
                        id: user._id,
                      }))
                    : this.state.options
                } // Options to display in the dropdown
                selectedValues={this.state.selectedUserValues} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>

            <div className={`${formStyle.form__group}`}>
              <div className={formStyle.form__label}>Bjórar</div>

              <Multiselect
                options={
                  this.props.beers
                    ? this.props.beers.map((beer) => ({
                        name: beer.name,
                        id: beer._id,
                      }))
                    : this.state.options
                } // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Link to="/events">
              <Button
                onClick={() => this.nextPath("/events")}
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
                buttonText="Skrá Viðburð"
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

function mapStateToProps({ auth, users, beers }) {
  return { auth, users, beers };
}

EventForm = connect(mapStateToProps, { fetchUsers, fetchBeers })(EventForm);

export default reduxForm({
  form: "eventForm",
  destroyOnUnmount: false,
})(EventForm);
