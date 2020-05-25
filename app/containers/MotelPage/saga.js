import { takeLatest } from 'redux-saga/effects';
import { GET_MOTEL } from '../MotelRoom/constants';
import { apiGetMotel } from '../MotelRoom/saga';

export default function* motelPageSaga() {
  yield takeLatest(GET_MOTEL, apiGetMotel);
}
