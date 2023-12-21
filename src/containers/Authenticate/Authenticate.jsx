import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import "./Authenticate.css";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from "../../Store/actions/index";

const Authenticate = (props) => {
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

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

  const onChange = (event, key) => {
    let tempDataForm = { ...controls };
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
    setControls(tempDataForm);
  };

  const formElementArray = Object.entries(controls).map(([key, value]) => {
    return { id: key, config: value };
  });
  let form = formElementArray.map((item, index) => (
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
  ));
  if (props.loading) {
    form = <Spinner />;
  }
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModalHandler = () => {
    setIsSignup((prevState) => !prevState);
  };

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  useEffect(() => {
    if (props.isAuthenticated) {
      navigate(props.authRedirectPath);
    }
  }, [navigate, props.isAuthenticated]);

  return (
    <div className="Authenticate">
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <div className="buttonsContainer">
          <Button color="green" disabled={!formIsValid} type="submit">
            SUBMIT
          </Button>
          <Button color="red" type="button" clicked={switchAuthModalHandler}>
            {`SWITCH TO ${isSignup ? "SIGNIN" : "SIGNUP"}`}
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
