import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { API } from "../../config";
import { GetProductAction, getProductSuccess, GET_PRODUCT } from "../actions/product.actions";
import { Product } from "../models/product";

function* handleGetProduct ({sortBy, order, limit}: GetProductAction) {
  const response = yield axios.get<Product[]>(`${API}/products`, {
    params: {sortBy, order, limit}
  })
  yield put(getProductSuccess(response.data, sortBy))
}

export default function* productSaga () {
  yield takeEvery(GET_PRODUCT, handleGetProduct)
}