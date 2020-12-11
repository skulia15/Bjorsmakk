import React from 'react';

import style from "./Button.module.scss";

const Button = ({iconName, buttonType, icon, buttonText, onClickMethod}) => {
  function getIcon(){
    if(icon) {
      return(<i className={iconName}></i>)
    }
    return;
  }
  return (
    <button className={`${style.button} ${buttonType? style[buttonType] : ''}`}>
        {buttonText}
        {getIcon()}
    </button>
  );
};

export default Button;