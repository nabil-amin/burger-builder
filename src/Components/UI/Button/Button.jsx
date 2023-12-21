import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      style={{ color: props.color }}
      className="Button"
      disabled={props.disabled}
      type={props.type}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};
export default Button;
