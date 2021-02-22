import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { API } from "../../config";
import { FilterProductAction, filterProductSuccess, FILTER_PRODUCT, GetProductAction, GetProductByIdAction, getProductByIdSuccess, getProductSuccess, GET_PRODUCT, GET_PRODUCT_BY_ID, SearchProductAction, searchProductSuccess, SEARCH_PRODUCT } from "../actions/product.actions";
import { Product } from "../models/product";

function* handleGetProduct ({sortBy, order, limit}: GetProductAction) {
  const response = yield axios.get<Product[]>(`${API}/products`, {
    params: {sortBy, order, limit}
  })
  yield put(getProductSuccess(response.data, sortBy))
}

function* handleSearchProduct ({payload: {search, category}}: SearchProductAction) {
  const response = yield axios.get<Product[]>(`${API}/products/search`, {
    params: {search, category}
  })
  yield put(searchProductSuccess(response.data))
}

function* handleFilterProduct (action: FilterProductAction) {
  const response = yield axios.post(`${API}/products/filter`, action.payload)
  yield put(filterProductSuccess(response.data, action.payload.skip ))
}
function* handleGetProductById (action: GetProductByIdAction) {
  const response = yield axios.get(`${API}/product/${action.payload.productId}`)
  yield put(getProductByIdSuccess(response.data ))
}

export default function* productSaga () {
  yield takeEvery(GET_PRODUCT, handleGetProduct)
  yield takeEvery(SEARCH_PRODUCT, handleSearchProduct)
  yield takeEvery(FILTER_PRODUCT, handleFilterProduct)
  yield takeEvery(GET_PRODUCT_BY_ID, handleGetProductById)
}