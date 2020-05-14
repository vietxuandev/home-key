/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { GET_MOTELS_SUCCESS, GET_MOTELS_FAIL } from './constants';

export const initialState = {
  motels: [],
  errors: [],
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOTELS_SUCCESS:
        draft.motels = action.response;
        break;
      case GET_MOTELS_FAIL:
        draft.errors = action.error.errors;
        break;
    }
  });

export default homePageReducer;
