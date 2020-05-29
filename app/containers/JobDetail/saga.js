import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_JOB } from './constants';
import { urlLink } from '../../helper/route';
import { getJobSuccess, getJobFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiGetJob(payload) {
  const { id } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.job + `/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getJobSuccess(response.data.data));
  } catch (error) {
    yield put(getJobFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* jobDetailSaga() {
  yield takeLatest(GET_JOB, apiGetJob);
}
