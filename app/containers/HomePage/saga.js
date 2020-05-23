import { put, takeLatest } from 'redux-saga/effects';
import { GET_MOTELS } from './constants';
import { urlLink } from '../../helper/route';
import { getMotelsSuccess, getMotelsFail } from './actions';
import axios from 'axios';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetMotels() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.motelList;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getMotelsSuccess(response.data.data.data));
  } catch (error) {
    yield put(getMotelsFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(GET_MOTELS, apiGetMotels);
}
