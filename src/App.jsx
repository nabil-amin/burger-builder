import React, { lazy, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Authenticate/Logout/Logout";
import * as actions from "./Store/actions/index";
import Spinner from "./Components/UI/Spinner/Spinner";

const AsyncCheckout = lazy(() => import("./containers/Checkout/Checkout"));
const AsyncOrders = lazy(() => import("./containers/Orders/Orders"));
const AsyncAuthenticate = lazy(() =>
  import("./containers/Authenticate/Authenticate")
);

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<Spinner />}>
            {props.isAuthenticated ? (
              <Routes>
                <Route path="/" element={<BurgerBuilder />} />
                <Route path="/checkout" element={<AsyncCheckout />} />
                <Route path="/auth" element={<AsyncAuthenticate />} />
                <Route path="/orders" element={<AsyncOrders />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<BurgerBuilder />} />
                <Route path="/auth" element={<AsyncAuthenticate />} />
                <Route path="*" element={<BurgerBuilder />} />
              </Routes>
            )}
          </Suspense>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

const mapstateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapstateToProps, mapDispatchToProps)(App);
