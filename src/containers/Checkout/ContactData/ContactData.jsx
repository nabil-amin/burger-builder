import React, { useState } from "react";
import { connect } from "react-redux";
import "./ContactData.css";
import Button from "../../../Components/UI/Button/Button";
import axiosinstance from "../../../api";
import Input from "../../../Components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import * as actions from "../../../Store/actions/index";

const ContactData = (props) => {
  const [dataForm, setDataForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "YourName",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZipCode",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 10,
      },
      valid: false,
      touched: false,
    },
    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "City",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethods: {
      elementType: "select",
      elementConfig: {
        option: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
      value: "fastest",
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in dataForm) {
      formData[formElementIdentifier] = dataForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price.toFixed(2),
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const formElementArray = Object.entries(dataForm).map(([key, value]) => {
    return { id: key, config: value };
  });

  const onChange = (event, key) => {
    let tempDataForm = { ...dataForm };
    tempDataForm[key].value = event.target.value;
    tempDataForm[key].valid = checkValidity(
      tempDataForm[key].value,
      tempDataForm[key].validation
    );
    tempDataForm[key].touched = true;

    let isFormValid = true;
    for (let tempDataFormElement in tempDataForm) {
      if (tempDataForm[tempDataFormElement].valid === false) {
        isFormValid = false;
      }
    }
    setFormIsValid(isFormValid);
    setDataForm(tempDataForm);
  };

  return (
    <div className="ContactData">
      <h4>Entar your Contact Data</h4>
      {props.loading ? (
        <Spinner />
      ) : (
        <form onSubmit={orderHandler}>
          {formElementArray.map((item, index) => {
            return (
              <Input
                key={`${item.config.elementType}-${index}`}
                elementType={item.config.elementType}
                elementConfig={item.config.elementConfig}
                isValid={item.config.valid}
                shouldValidata={item.config.validation}
                touched={item.config.touched}
                value={item.config.value}
                onChange={(e) => onChange(e, item.id)}
              />
            );
          })}
          <Button disabled={!formIsValid} color="green" type="submit">
            ORDER
          </Button>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    loading: state.orders.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axiosinstance));
