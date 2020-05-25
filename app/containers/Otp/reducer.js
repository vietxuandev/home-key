/*
 *
 * Otp reducer
 *
 */
import produce from 'immer';
import {
  POST_OTP_SUCCESS,
  POST_OTP_FAIL,
  GET_RESEND_OTP_SUCCESS,
  GET_RESEND_OTP_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
  otpErrors: [],
  open: false,
};

/* eslint-disable default-case, no-param-reassign */
const otpReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_OTP_SUCCESS:
        draft.open = false;
        break;
      case POST_OTP_FAIL:
        draft.otpErrors = action.error.errors;
        break;
      case GET_RESEND_OTP_SUCCESS:
        draft.open = true;
        draft.otpErrors = [];
        break;
      case GET_RESEND_OTP_FAIL:
        draft.otpErrors = action.error.errors;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default otpReducer;
