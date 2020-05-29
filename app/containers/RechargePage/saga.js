import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
import { POST_RECHARGE } from './constants';
import { urlLink } from '../../helper/route';
import { postRechargeSuccess, postRechargeFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiPostRecharge(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.recharge;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, payload);
    yield put(postRechargeSuccess(response.data.data));
    window.location.replace(response.data.data);
  } catch (error) {
    yield put(postRechargeFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* rechargePageSaga() {
  yield takeLatest(POST_RECHARGE, apiPostRecharge);
}
