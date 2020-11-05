import React from 'react';

import style from "./Button.module.scss";

const Button = (props) => {
  function getIcon(){
    if(props.icon) {
      return(<i className={props.iconName}></i>)
    }
    return;
  }
  return (
    <div className={`${style.button} ${props.type? style[props.type] : ''}`}>
        {props.buttonText}
        {getIcon()}
    </div>
  );
};

export default Button;