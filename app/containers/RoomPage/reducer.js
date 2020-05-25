/*
 *
 * RoomPage reducer
 *
 */
import produce from 'immer';
import { GET_ROOM_SUCCESS, GET_ROOM_FAIL } from './constants';

export const initialState = {
  room: {},
  roomErrors: [],
};

/* eslint-disable default-case, no-param-reassign */
const roomPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ROOM_SUCCESS:
        draft.room = action.response;
        break;
      case GET_ROOM_FAIL:
        draft.roomErrors = action.error.errors;
        break;
    }
  });

export default roomPageReducer;
