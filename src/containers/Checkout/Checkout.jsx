import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!props.ingredients || (props.ingredients && props.purchased)) {
      navigate("/");
    }
  }, [props.ingredients, props.purchased]);

  const checkoutCancelHandler = () => {
    navigate(-1);
  };

  const onCheckoutContinue = () => {
    setShowForm(true);
  };

  return props.ingredients ? (
    <div>
      <CheckoutSummary
        ingredients={props.ingredients}
        checkoutCancel={checkoutCancelHandler}
        checkoutContinue={onCheckoutContinue}
      />
      {showForm ? (
        <ContactData ingredients={props.ingredients} price={props.price} />
      ) : null}
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    purchased: state.orders.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
