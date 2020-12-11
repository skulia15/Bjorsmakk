import React from "react";
import props from "prop-types";
// import { Field } from "redux-form";

import style from "./NumberInput.module.scss";
import formStyle from "../Form.module.scss";

const NumberInput = React.forwardRef(({ label, name }, ref) => {
  return (
    <div className={`${formStyle.form__group}`}>
      <label htmlFor={props.label} className={formStyle.form__label}>
        {label}
      </label>
      <input
        className={style.numberInput}
        name={name}
        type="number"
        min="0"
        max="30"
        step="0.1"
        ref={ref}
        required
      />
    </div>
  );
});

export default NumberInput;
