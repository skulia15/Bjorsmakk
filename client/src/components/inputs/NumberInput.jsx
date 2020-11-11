import React from "react";
import props from "prop-types";
import { Field } from "redux-form";

import style from "./NumberInput.module.scss";
import formStyle from "../Form.module.scss";

class NumberInput extends React.Component {
  render() {
    return (
      <div className={`${formStyle.form__group}`}>
        <label htmlFor={props.label} className={formStyle.form__label}>
          {this.props.label}
        </label>
        <Field
          component="input"
          name={this.props.name}
          type="number"
          min="0"
          max="30"
          step="0.1"
        />
      </div>
    );
  }
}

export default NumberInput;
