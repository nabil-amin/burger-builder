import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
  return (
    <div className="checkoutSummary">
      <h1>we hope it testes well !</h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button color="red" clicked={props.checkoutCancel}>
        CANCEL
      </Button>
      <Button color="green" clicked={props.checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};
export default CheckoutSummary;
