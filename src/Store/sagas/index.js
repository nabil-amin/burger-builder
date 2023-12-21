import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authChekStateSaga,
} from "./Authenticate";
import { initIngredientsSaga } from "./BurgerBuilder";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./orders";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTHENTICATE_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTHENTICATE_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTHENTICATE_USER, authUserSaga),
    takeEvery(actionTypes.AUTHENTICATE_CHECK_STATE, authChekStateSaga),
  ]);
}

export function* watchBurgerBuilderh() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
