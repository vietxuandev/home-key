/*
 *
 * SignUpPage actions
 *
 */

import {
  POST_SIGN_UP,
  POST_SIGN_UP_SUCCESS,
  POST_SIGN_UP_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function postSignUp(payload) {
  return {
    type: POST_SIGN_UP,
    payload,
  };
}

export function postSignUpSuccess(response) {
  return {
    type: POST_SIGN_UP_SUCCESS,
    response,
  };
}

export function postSignUpFail(error) {
  return {
    type: POST_SIGN_UP_FAIL,
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
