import { takeLatest } from 'redux-saga/effects';
import { GET_ROOM } from '../RoomPage/constants';
import { apiGetRoom } from '../RoomPage/saga';

export default function* jobPageSaga() {
  yield takeLatest(GET_ROOM, apiGetRoom);
}
