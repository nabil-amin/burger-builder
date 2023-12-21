import React from "react";
import "./Input.css";

const Input = (props) => {
  let elementType = null;
  const classes = ["inputElement"];
  if (!props.isValid) {
    classes.push("inValid");
  }
  switch (props.elementType) {
    case "input":
      elementType = (
        <input
          className={classes.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "textarea":
      elementType = (
        <textarea
          className={classes.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    case "select":
      elementType = (
        <select
          className={classes.join(" ")}
          value={props.value}
          onChange={props.onChange}
        >
          {props.elementConfig.option.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      elementType = (
        <input
          className={classes.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
  }

  return (
    <div className="input">
      <label className="label">{props.label}</label>
      {elementType}
    </div>
  );
};
export default Input;
