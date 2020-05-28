import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_ROOM } from './constants';
import { urlLink } from '../../helper/route';
import { getRoomFail, getRoomSuccess } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetRoom(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.roomDetail + id;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getRoomSuccess(response.data.data));
  } catch (error) {
    yield put(getRoomFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* roomPageSaga() {
  yield takeLatest(GET_ROOM, apiGetRoom);
}
