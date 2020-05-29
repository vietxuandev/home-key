import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_CALLBACK } from './constants';
import { urlLink } from '../../helper/route';
import { getCallBackFail, getCallBackSuccess } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
import localStore from 'local-storage';

export function* apiGetCallBack(payload) {
  const { queryString } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.callBack + queryString;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getCallBackSuccess(response.data));
  } catch (error) {
    yield put(getCallBackFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* paymentReturnSaga() {
  yield takeLatest(GET_CALLBACK, apiGetCallBack);
}
