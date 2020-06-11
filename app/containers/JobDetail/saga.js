import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_JOB, PUT_ACTIVE, PUT_CHECKOUT } from './constants';
import { urlLink } from '../../helper/route';
import {
  getJobSuccess,
  getJobFail,
  putActiveSuccess,
  putActiveFail,
  getJob,
  putCheckOutSuccess,
  putCheckOutFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
import { GET_PROFILE } from '../ProfilePage/constants';
import { apiGetProfile } from '../ProfilePage/saga';

export function* apiGetJob(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.job + `/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getJobSuccess(response.data.data));
  } catch (error) {
    yield put(getJobFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutActive(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.job + `/${id}/active`;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl);
    yield put(putActiveSuccess(response.data.data));
    yield put(getJob(id));
  } catch (error) {
    yield put(putActiveFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
export function* apiPutCheckOut(payload) {
  const { id, returnRoomDate } = payload;
  console.log(returnRoomDate);
  const requestUrl =
    urlLink.api.serverUrl + urlLink.api.job + `/${id}/updateReturnRoomDate`;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, { returnRoomDate });
    yield put(putCheckOutSuccess(response.data.data));
    yield put(getJob(id));
  } catch (error) {
    yield put(putCheckOutFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* jobDetailSaga() {
  yield takeLatest(GET_JOB, apiGetJob);
  yield takeLatest(GET_PROFILE, apiGetProfile);
  yield takeLatest(PUT_ACTIVE, apiPutActive);
  yield takeLatest(PUT_CHECKOUT, apiPutCheckOut);
}
