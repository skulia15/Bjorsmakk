import React from "react";
import props from "prop-types";
import { Field } from "redux-form";

import style from "./SelectInput.module.scss";
import formStyle from "../Form.module.scss";

class SelectInput extends React.Component {
  getOptions() {
    return this.props.options
      .sort((a, b) =>
        a[this.props.optionKey] > b[this.props.optionKey] ? 1 : -1
      )
      .map((option) => {
        return (
          <option
            className=""
            key={option._id}
            value={option[this.props.valueKey]}
          >
            {option[this.props.optionKey]}
          </option>
        );
      });
  }
  render() {
    return (
      <div className={`${formStyle.form__group}`}>
        <label htmlFor={props.label} className={formStyle.form__label}>
          {this.props.label}
        </label>
        <Field component="select" name={this.props.name} className={style.selectInput}>
          {this.getOptions()}
        </Field>
      </div>
    );
  }
}

export default SelectInput;
