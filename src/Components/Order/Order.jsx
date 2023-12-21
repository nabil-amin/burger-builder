import React from "react";
import "./Order.css";

const Order = (props) => {
  return (
    <div className="Order">
      <p>
        Ingredients:
        {Object.entries(props.ingredients).map(([key, value]) => {
          return (
            <span
              key={key}
              style={{
                textTransform: "capitalize",
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px",
              }}
            >
              {key} ({value})
            </span>
          );
        })}
      </p>
      <p>
        price:<strong>USD {props.price}</strong>
      </p>
    </div>
  );
};
export default Order;
