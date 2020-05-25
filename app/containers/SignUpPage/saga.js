import { put, takeLatest } from 'redux-saga/effects';
import localStoreService from 'local-storage';
import axios from 'axios';
import { POST_SIGN_UP } from './constants';
import { urlLink } from '../../helper/route';
import { postSignUpSuccess, postSignUpFail } from './actions';
import { loadRepos, reposLoaded, saveCurrentUser } from '../App/actions';

export function* apiPostSignUp(payload) {
  const { payload: data = {} } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.sign_up;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, data);
    const {
      data: userSignUp = {
        token: '',
      },
    } = response.data;
    yield (axios.defaults.headers.common.Authorization = `Bearer ${
      userSignUp.token
    }`);
    yield localStoreService.set('token', userSignUp.token);
    yield localStoreService.set('user', userSignUp);
    yield put(postSignUpSuccess(userSignUp));
    yield put(saveCurrentUser(userSignUp));
  } catch (error) {
    if (error.response) {
      const { data: errors = {} } = error.response;
      yield put(postSignUpFail(errors));
    } else {
      const offlineData = {
        data: [],
        error: true,
        errors: [
          { errorCode: 4, errorMessage: 'Error: 500 server internal error' },
        ],
      };
      yield put(postSignUpFail(offlineData));
    }
  } finally {
    yield put(reposLoaded());
  }
}

export default function* signUpPageSaga() {
  yield takeLatest(POST_SIGN_UP, apiPostSignUp);
}
