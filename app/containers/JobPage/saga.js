import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import { POST_JOB } from './constants';
import { urlLink } from '../../helper/route';
import { postJobFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
import { GET_ROOM } from '../RoomPage/constants';
import { apiGetRoom } from '../RoomPage/saga';

export function* apiPostJob(payload) {
  const { formData } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.job;
  yield put(loadRepos());
  try {
    const response = yield axios.post(requestUrl, formData);
    yield put(push(`/payment/${response.data.data._id}`));
  } catch (error) {
    yield put(postJobFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* jobPageSaga() {
  yield takeLatest(POST_JOB, apiPostJob);
  yield takeLatest(GET_ROOM, apiGetRoom);
}
