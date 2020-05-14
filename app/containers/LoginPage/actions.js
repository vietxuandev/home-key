/*
 *
 * LoginPage actions
 *
 */

import { POST_LOGIN_FAIL, POST_LOGIN_SUCCESS, POST_LOGIN } from './constants';

export function postLogin(payload) {
  return {
    type: POST_LOGIN,
    payload,
  };
}

export function postLoginSuccess(response) {
  return {
    type: POST_LOGIN_SUCCESS,
    response,
  };
}

export function postLoginFail(error) {
  return {
    type: POST_LOGIN_FAIL,
    error,
  };
}
