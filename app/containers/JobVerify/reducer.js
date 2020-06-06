/*
 *
 * JobVerify reducer
 *
 */
import produce from 'immer';
import { CHANGE_STORE_DATA } from './constants';

export const initialState = {
  file: [],
};

/* eslint-disable default-case, no-param-reassign */
const jobVerifyReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default jobVerifyReducer;
