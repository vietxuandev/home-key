/*
 *
 * Otp actions
 *
 */

import {
  POST_OTP,
  POST_OTP_SUCCESS,
  POST_OTP_FAIL,
  GET_RESEND_OTP,
  GET_RESEND_OTP_SUCCESS,
  GET_RESEND_OTP_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function postOTP(payload) {
  return {
    type: POST_OTP,
    payload,
  };
}

export function postOTPSuccess(response) {
  return {
    type: POST_OTP_SUCCESS,
    response,
  };
}

export function postOTPFail(error) {
  return {
    type: POST_OTP_FAIL,
    error,
  };
}

export function getResendOTP() {
  return {
    type: GET_RESEND_OTP,
  };
}

export function getResendOTPSuccess(response) {
  return {
    type: GET_RESEND_OTP_SUCCESS,
    response,
  };
}

export function getResendOTPFail(error) {
  return {
    type: GET_RESEND_OTP_FAIL,
    error,
  };
}

export function changeStoreData(key, value) {
  return {
    type: CHANGE_STORE_DATA,
    key,
    value,
  };
}
