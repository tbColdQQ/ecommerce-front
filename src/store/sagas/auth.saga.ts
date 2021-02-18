import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'
import { API } from '../../config'
import { SIGNUP, SignupAction, signupFail, signupSuccess } from '../actions/auth.action'

function* handleSignup (action: SignupAction) {
  try {
    console.log('------>', API)
    yield axios.post(`${API}/signup`, action.payload)
    yield put(signupSuccess())
  } catch (e) {
    yield put(signupFail(e.response.data.error))
  }
  
}

export default function* authSaga () {
  yield takeEvery(SIGNUP, handleSignup)
}