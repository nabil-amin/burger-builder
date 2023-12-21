import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axiosInstance from "../../api";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axiosInstance.post(
      `/orders.json?auth=${action.token}`,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axiosInstance.get(`orders.json` + queryParams);
    const res = Object.values(response.data);
    const fetchOrders = res.map((item) => {
      return {
        ingredients: item.ingredients,
        price: item.price,
      };
    });
    yield put(actions.fetchOrdersSuccess(fetchOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
