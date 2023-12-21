import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../Store/actions/index";

const Logout = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.onLogout();
    navigate("/");
  }, []);

  return <></>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
