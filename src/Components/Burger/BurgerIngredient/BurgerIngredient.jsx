import React from "react";
import "./BurgerIngredient.css";

const BurgerIngredient = (props) => {
  let ingredients = null;
  switch (props.type) {
    case "BreadBottom":
      ingredients = <div className={"BreadBottom"}></div>;
      break;
    case "BreadTop":
      ingredients = (
        <div className={"BreadTop"}>
          <div className={"Seeds1"}></div>
          <div className={"Seeds2"}></div>
        </div>
      );
      break;
    case "Meat":
      ingredients = <div className={"Meat"}></div>;
      break;
    case "Cheese":
      ingredients = <div className={"Cheese"}></div>;
      break;
    case "Salad":
      ingredients = <div className={"Salad"}></div>;
      break;
    case "Bacon":
      ingredients = <div className={"Bacon"}></div>;
      break;
    default:
      ingredients = null;
  }
  return ingredients;
};
export default BurgerIngredient;
