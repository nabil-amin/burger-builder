import React from "react";
import "./BuildControl.css";

const BuildControl = (props) => {
  return (
    <div className="BuildControl">
      <div className="Label">{props.Label}</div>
      <button
        className="Less"
        onClick={props.removed}
        disabled={props.disabled}
      >
        less
      </button>
      <button className="More" onClick={props.added}>
        more
      </button>
    </div>
  );
};
export default BuildControl;
