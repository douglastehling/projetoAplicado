import { takeLatest, all } from "redux-saga/effects";

import history from "~/services/history";

function* updateCart({ payload }) {
  yield history.push("/checkout");
}

export default all([takeLatest("@cart/UPDATE_CART", updateCart)]);
