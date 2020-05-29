import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_PROFILE, GET_JOBS } from './constants';
import { urlLink } from '../../helper/route';
import {
  getProfileSuccess,
  getProfileFail,
  getJobsSuccess,
  getJobsFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetProfile() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.profile;
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

export function* apiGetJobs() {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.jobs;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getJobsSuccess(response.data.data));
  } catch (error) {
    yield put(getJobsFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* profilePageSaga() {
  yield takeLatest(GET_PROFILE, apiGetProfile);
  yield takeLatest(GET_JOBS, apiGetJobs);
}
