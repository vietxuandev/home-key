/*
 *
 * SignUpPage reducer
 *
 */
import produce from 'immer';
import {
  POST_SIGN_UP_SUCCESS,
  POST_SIGN_UP_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
  currentUser: {},
  signUpErrors: [],
  open: false,
};

/* eslint-disable default-case, no-param-reassign */
const signUpPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_SIGN_UP_SUCCESS:
        draft.currentUser = action.response;
        draft.open = true;
        break;
      case POST_SIGN_UP_FAIL:
        draft.signUpErrors = action.error.errors;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default signUpPageReducer;
