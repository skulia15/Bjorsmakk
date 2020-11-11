import { reduxForm } from "redux-form";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "../Form.module.scss";
import TextInput from "../inputs/TextInput";
import NumberInput from "../inputs/NumberInput";
import SelectInput from "../inputs/SelectInput";
import Button from "../button/Button";
import { compose } from "redux";
import { fetchTypes } from "../../actions";

class BeerForm extends Component {
  nextPath(path) {
    this.props.history.push(path);
  }
  componentDidMount() {
    this.props.fetchTypes();
  }
  render() {
    return (
      <div className={styles.formContainer}>
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
            <SelectInput
              label="Bjórflokkur"
              name="type"
              options={this.props.types}
              optionKey="typeName"
              valueKey="_id"
            ></SelectInput>
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

            <a
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

function mapStateToProps({ auth, types }) {
  return { auth, types };
}

BeerForm = connect(mapStateToProps, { fetchTypes })(BeerForm);

export default compose(
  withRouter,
  reduxForm({
    form: "beerForm",
    destroyOnUnmount: false,
  })
)(BeerForm);
