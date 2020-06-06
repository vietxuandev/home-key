/*
 *
 * JobPage reducer
 *
 */
import produce from 'immer';
import { GET_ROOM_SUCCESS, GET_ROOM_FAIL } from '../RoomPage/constants';
import {
  POST_JOB_FAIL,
  POST_JOB_SUCCESS,
  CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
  room: {},
  roomErrors: [],
  jobErrors: [],
};

/* eslint-disable default-case, no-param-reassign */
const jobPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ROOM_SUCCESS:
        draft.room = action.response;
        break;
      case GET_ROOM_FAIL:
        draft.roomErrors = action.error.errors;
        break;
      case POST_JOB_SUCCESS:
        draft.room = action.response;
        break;
      case POST_JOB_FAIL:
        draft.jobErrors = action.error.errors;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default jobPageReducer;
