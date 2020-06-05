import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { PUT_PAY } from './constants';
import { urlLink } from '../../helper/route';
import { putPaySuccess, putPayFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiPutPay(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.pay;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, { orderId: id });
    yield put(putPaySuccess(response.data.data));
  } catch (error) {
    yield put(putPayFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
export default function* paymentSaga() {
  yield takeLatest(PUT_PAY, apiPutPay);
}
