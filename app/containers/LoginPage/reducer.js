/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { POST_LOGIN_FAIL, POST_LOGIN_SUCCESS } from './constants';

export const initialState = {
  currentUser: {},
  errors: [],
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_LOGIN_SUCCESS:
        draft.currentUser = action.response;
        break;
      case POST_LOGIN_FAIL:
        draft.error = action.error.errors;
        break;
    }
  });

export default loginPageReducer;
