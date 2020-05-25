import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { push } from 'react-router-redux';
import { POST_LOGIN } from './constants';
import { urlLink } from '../../helper/route';
import { postLoginFail } from './actions';
import { saveCurrentUser, loadRepos, reposLoaded } from '../App/actions';
import localStore from 'local-storage';

export function* apiPostLogin(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.sign_in;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, payload.payload);
    const {
      data: userLogin,
      data: { token },
    } = response.data;
    // --------------------axios setting headers to request API-----------------------------------
    yield (axios.defaults.headers.common.Authorization = `Bearer ${token}`);
    // -------------------------------------------------------------------------------------------
    yield localStore.set('token', userLogin.token);
    yield localStore.set('role', userLogin.role);
    yield localStore.set('user', userLogin);
    yield put(postLoginFail(userLogin));
    yield put(saveCurrentUser(userLogin));
    yield put(push(urlLink.home));
  } catch (error) {
    if (error.response) {
      const { data = {} } = error.response;
      yield put(postLoginFail(data));
    } else {
      const offlineData = {
        data: [],
        error: true,
        errors: [
          { errorCode: 4, errorMessage: 'Error: 500 server internal error' },
        ],
      };
      yield put(postLoginFail(offlineData));
    }
  } finally {
    yield put(reposLoaded());
  }
}
// Individual exports for testing
export default function* loginPageSaga() {
  yield takeLatest(POST_LOGIN, apiPostLogin);
}
