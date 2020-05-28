import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_PROFILE } from './constants';
import { urlLink } from '../../helper/route';
import { getProfileSuccess, getProfileFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetProfile() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.profile;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getProfileSuccess(response.data.data));
  } catch (error) {
    yield put(getProfileFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* profilePageSaga() {
  yield takeLatest(GET_PROFILE, apiGetProfile);
}
