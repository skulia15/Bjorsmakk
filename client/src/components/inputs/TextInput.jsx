import React from 'react';

import style from "./TextInput.module.scss";

const TextInput = (props) => {
  return (
      <div className={`${style.form__group}`}>
        <input
          type="text"
          className={style.form__field}
          placeholder={props.placeholder}
          name={props.placeholder}
          id={props.placeholder}
          required
        />
        <label htmlFor={props.placeholder} className={style.form__label}>
          {props.label}
        </label>
      </div>
  );
};

export default TextInput;