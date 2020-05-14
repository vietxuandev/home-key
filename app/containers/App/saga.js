import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import { LOGOUT } from './constants';
import { urlLink } from '../helper/route';
import {
  getLogoutSuccess,
  getLogoutFail,
  loadRepos,
  reposLoaded,
  saveCurrentUser,
} from './actions';

// import { take, call, put, select } from 'redux-saga/effects';
export function* apiLogout() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.log_out;
  yield put(loadRepos());
  try {
    yield axios.put(requestUrl);
    // clear header axios
    yield (axios.defaults.headers.common.Authorization = '');
    yield put(getLogoutSuccess());
  } catch (error) {
    yield put(getLogoutFail());
  } finally {
    yield put(saveCurrentUser(''));
    yield window.localStorage.clear();
    yield window.sessionStorage.clear();
    yield put(push(urlLink.home));
    yield put(reposLoaded());
  }
}
// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
export default function* appSaga() {
  yield takeLatest(LOGOUT, apiLogout);
}
