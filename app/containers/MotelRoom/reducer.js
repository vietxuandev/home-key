/*
 *
 * MotelRoom reducer
 *
 */
import produce from 'immer';
import { GET_MOTEL_SUCCESS, GET_MOTEL_FAIL } from './constants';

export const initialState = {
  motel: {},
};

const motelRoomReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOTEL_SUCCESS:
        draft.motel = action.response;
        break;
      case GET_MOTEL_FAIL:
        draft.motel = action.error;
        break;
    }
  });

export default motelRoomReducer;
