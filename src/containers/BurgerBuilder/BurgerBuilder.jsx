import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrdarSummary from "../../Components/Burger/OrdarSummary/OrdarSummary";
import axiosinstance from "../../api";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from "../../Store/actions/index";

const BurgerBuilder = (props) => {
  const navigate = useNavigate();

  const [showSummary, setShowSummary] = useState(false);

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setShowSummary(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      navigate("/auth");
    }
  };

  const onCloseModal = useCallback(() => {
    setShowSummary(false);
  }, []);

  const updatePurchasableState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  };

  const disabledinfo = { ...props.ingredients };
  for (let key in disabledinfo) {
    disabledinfo[key] = disabledinfo[key] <= 0;
  }

  useEffect(() => {
    props.onInitIngredient();
  }, []);

  const purchaseContinue = () => {
    props.onInitPurchase();
    navigate("/checkout");
  };

  const renderBurger = () => {
    if (props.error) {
      return <p>ingredent cant be loading</p>;
    }

    if (props.ingredients) {
      return (
        <>
          <Burger ingredients={props.ingredients} />
          <BuildControls
            ingredientAdd={props.onIngredientAdd}
            ingredientremove={props.onIngredientRemove}
            disabled={disabledinfo}
            purchasable={updatePurchasableState(props.ingredients)}
            onOrder={purchaseHandler}
            isAuth={props.isAuthenticated}
            price={props.price}
          />
        </>
      );
    }

    return <Spinner />;
  };

  return (
    <>
      <Modal show={showSummary} modalClosed={onCloseModal}>
        {props.ingredients ? (
          <OrdarSummary
            ingredients={props.ingredients}
            price={props.price}
            purchaseCanceled={onCloseModal}
            purchaseContinued={purchaseContinue}
          />
        ) : null}
      </Modal>
      {renderBurger()}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdd: (igName) => dispatch(actions.addIngredient(igName)),
    onIngredientRemove: (igName) => dispatch(actions.removeIngredient(igName)),
    onInitIngredient: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosinstance));
