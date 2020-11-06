import React from 'react';
import { Field } from "redux-form";

import style from "./TextInput.module.scss";

const TextInput = (props) => {
  return (
      <div className={`${style.form__group}`}>
        <Field
          type="text"
          component="input"
          className={style.form__field}
          placeholder={props.placeholder}
          name={props.name}
          id={props.placeholder}
          required
        ></Field>
        <label htmlFor={props.placeholder} className={style.form__label}>
          {props.label}
        </label>
      </div>
  );
};

export default TextInput;