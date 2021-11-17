// import validateEmails from '../../utils/validateEmails'
import { reduxForm } from "redux-form";
import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "../Form.module.scss";
import TextInput from "../inputs/TextInput";
import Button from "../button/Button";
import { compose } from "redux";

class TypeForm extends Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>Skrá Bjórflokk</div>

        <form
          name="typeForm"
          className={styles.standardForm}
          onSubmit={this.props.handleSubmit(this.props.onTypeSubmit)}
          ref={(ref) => {
            this.form = ref;
          }}
        >
          <div className={styles.inputsContainer}>
            <TextInput placeholder="" label="Bjórflokkur" name="typeName"></TextInput>
          </div>

          <div className={styles.buttonContainer}>
            <Link to="/types">
              <Button
                onClick={() => this.nextPath("/types")}
                buttonText="Hætta við"
                buttonType="cancel"
              ></Button>
            </Link>

            <a
              href="/types"
              onClick={() => {
                this.form.dispatchEvent(new Event("submit"));
              }}
            >
              <Button
                buttonText="Skrá flokk"
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

function mapStateToProps({ auth }) {
  return { auth };
}

TypeForm = connect(mapStateToProps)(TypeForm);

export default compose(
  // withRouter,
  reduxForm({
    form: "typeForm",
    destroyOnUnmount: false,
  })
)(TypeForm);
