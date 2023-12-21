import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Order from "../../Components/Order/Order";
import axiosinstance from "../../api";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as action from "../../Store/actions/index";

const Orders = (props) => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, [props.token]);

  return (
    <div>
      {props.loading ? (
        <Spinner />
      ) : (
        props.orders.map((order, index) => {
          return (
            <Order
              key={`${order.price}-${index}`}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    orders: state.orders.orders,
    loading: state.orders.loading,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(action.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axiosinstance));
