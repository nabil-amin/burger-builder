import React from "react";
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import {
  watchAuth,
  watchBurgerBuilderh,
  watchOrder,
} from "./Store/sagas/index.js";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import App from "./App.jsx";
import "./index.css";
import BurgerBuilderReducer from "./Store/reducers/BurgerBuilder";
import orderReducer from "./Store/reducers/orders";
import authReducer from "./Store/reducers/Authenticate";
import createSagaMiddleware from "redux-saga";

const rootReducer = combineReducers({
  burgerBuilder: BurgerBuilderReducer,
  orders: orderReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, thunk));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilderh);
sagaMiddleware.run(watchOrder);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
