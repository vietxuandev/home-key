import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import { PUT_IMAGES } from './constants';
import { urlLink } from '../../helper/route';
import { putImagesSuccess, putImagesFail } from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiPutImages(payload) {
  const { id, formData } = payload;
  const requestUrl = urlLink.api.serverUrl + urlLink.api.job + `/${id}/images`;
  yield put(loadRepos());
  try {
    yield axios.put(requestUrl, formData);
    yield put(push('/profile'));
  } catch (error) {
    yield put(putImagesFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
export default function* jobVerifySaga() {
  yield takeLatest(PUT_IMAGES, apiPutImages);
}
