import React from 'react';

import style from "./TextInput.module.scss";

const TextInput = React.forwardRef(({placeholder, name, label}, ref) => {
  return (
      <div className={`${style.form__group}`}>
        <input
          type="text"
          className={style.form__field}
          placeholder={placeholder}
          name={name}
          id={placeholder}
          ref={ref}
          required
        ></input>
        <label htmlFor={placeholder} className={style.form__label}>
          {label}
        </label>
      </div>
  );
});

export default TextInput;