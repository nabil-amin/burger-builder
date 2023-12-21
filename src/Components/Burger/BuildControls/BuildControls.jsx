import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const Controls = [
  { Label: "Salad", type: "Salad" },
  { Label: "Bacon", type: "Bacon" },
  { Label: "Cheese", type: "Cheese" },
  { Label: "Meat", type: "Meat" },
];

const BuildControls = (props) => {
  return (
    <div className="BuildControls">
      <p>
        Current price:<strong>{props.price.toFixed(2)}</strong>
      </p>
      {Controls.map((ctrl) => (
        <BuildControl
          key={ctrl.Label}
          Label={ctrl.Label}
          added={() => props.ingredientAdd(ctrl.type)}
          removed={() => props.ingredientremove(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className="OrderButton"
        disabled={!props.purchasable}
        onClick={props.onOrder}
      >
        {props.isAuth ? "OrderNow" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};
export default BuildControls;
