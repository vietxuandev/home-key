import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_PROFILE, GET_JOBS, DELETE_JOB } from './constants';
import { urlLink } from '../../helper/route';
import {
  getProfileSuccess,
  getProfileFail,
  getJobsSuccess,
  getJobsFail,
  deleteJobSuccess,
  deleteJobFail,
  getJobs,
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

export function* apiDeleteJob(payload) {
  const { id = '' } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.job + `/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.delete(requestUrl);
    yield put(deleteJobSuccess(response.data.data));
    yield put(getJobs());
  } catch (error) {
    yield put(deleteJobFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* profilePageSaga() {
  yield takeLatest(GET_PROFILE, apiGetProfile);
  yield takeLatest(GET_JOBS, apiGetJobs);
  yield takeLatest(DELETE_JOB, apiDeleteJob);
}
