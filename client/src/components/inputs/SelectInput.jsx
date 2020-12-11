import React from "react";
import props from "prop-types";


import style from "./SelectInput.module.scss";
import formStyle from "../Form.module.scss";

const SelectInput = React.forwardRef(({ label, name, options, valueKey, optionKey }, ref) => {
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
      <select component="select" name={name} className={style.selectInput} ref={ref}>
        <Options />
      </select>
    </div>
  );
});

export default SelectInput;
