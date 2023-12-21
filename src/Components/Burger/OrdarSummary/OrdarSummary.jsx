import React from "react";
import Button from "../../UI/Button/Button";

const OrdarSummary = (props) => {
  const entries = Object.entries(props.ingredients);
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger whith the following ingredients</p>
      {entries.map(([key, value]) => {
        return <ul key={key}>{`${key}: ${value}`}</ul>;
      })}
      <p>
        <strong>Total Price:{props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button color="red" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button color="green" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};
export default OrdarSummary;
