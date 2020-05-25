import { put, takeLatest } from 'redux-saga/effects';
import { GET_MOTEL } from './constants';
import { urlLink } from '../../helper/route';
import { getMotelSuccess, getMotelFail } from './actions';
import axios from 'axios';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetMotel(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.motelDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getMotelSuccess(response.data.data));
  } catch (error) {
    yield put(getMotelFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* motelRoomSaga() {
  yield takeLatest(GET_MOTEL, apiGetMotel);
}
