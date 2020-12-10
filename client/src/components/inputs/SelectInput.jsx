import React from "react";
import props from "prop-types";
import { Field } from "redux-form";

import style from "./SelectInput.module.scss";
import formStyle from "../Form.module.scss";

const SelectInput = ({ label, name, options, valueKey, optionKey }) => {
  const Options = () => {
    return options
      .sort((a, b) =>
        a[optionKey] > b[optionKey] ? 1 : -1
      )
      .map((option) => {
        return (
          <option className="" key={option._id} value={option[valueKey]}>
            {option[optionKey]}
          </option>
        );
      });
  };
  return (
    <div className={`${formStyle.form__group}`}>
      <label htmlFor={props.label} className={formStyle.form__label}>
        {label}
      </label>
      <Field component="select" name={name} className={style.selectInput}>
        <Options />
      </Field>
    </div>
  );
};

export default SelectInput;
