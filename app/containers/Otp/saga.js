import { put, takeLatest } from 'redux-saga/effects';
import localStoreService from 'local-storage';
import axios from 'axios';
import { push } from 'react-router-redux';
import { POST_OTP, GET_RESEND_OTP } from './constants';
import { urlLink } from '../../helper/route';
import {
  postOTPSuccess,
  postOTPFail,
  getResendOTPSuccess,
  getResendOTPFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiPostOTP(payload) {
  const { code } = payload.payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.confirmOTP;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, { code: code });
    yield put(postOTPSuccess(response.data.data));
    yield put(push(urlLink.home));
  } catch (error) {
    yield put(postOTPFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiGetResendOTP() {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStoreService.get('user').token,
    },
  };
  const requestUrl = urlLink.api.serverUrl + urlLink.api.auth.resendOTP;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl, config);
    yield put(getResendOTPSuccess(response.data.data));
  } catch (error) {
    yield put(getResendOTPFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* otpSaga() {
  yield takeLatest(POST_OTP, apiPostOTP);
  yield takeLatest(GET_RESEND_OTP, apiGetResendOTP);
}
