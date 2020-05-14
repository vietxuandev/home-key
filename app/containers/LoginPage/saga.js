import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import { POST_LOGIN } from './constants';
import { urlLink } from '../helper/route';
import { postLoginSuccess, postLoginFail } from './actions';
import { loadRepos, reposLoaded, saveCurrentUser } from '../App/actions';

export function* apiPostLogin(payload) {
  const { payload: data = {} } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.sign_in;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);
    const {
      data: userLogin,
      data: { token },
    } = response.data;
    // --------------------axios setting headers to request API-----------------------------------
    yield (axios.defaults.headers.common.Authorization = `Bearer ${token}`);
    // -------------------------------------------------------------------------------------------
    yield localStorage.set('token', userLogin.token);
    yield localStorage.set('role', userLogin.role);
    yield localStorage.set('user', userLogin);
    yield put(postSignInSuccess(userLogin));
    yield put(saveCurrentUser(userLogin));
    yield put(push(urlLink.home));
  } catch (error) {
    if (error.response) {
      const { data = {} } = error.response;
      yield put(postLoginSuccess(data));
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
