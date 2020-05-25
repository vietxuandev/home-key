/*
 *
 * Logout actions
 *
 */

import { LOGOUT_SUCCESS, LOGOUT_FAIL, LOGOUT } from './constants';

export function getLogout() {
  return {
    type: LOGOUT,
  };
}

export function getLogoutSuccess(response) {
  return {
    type: LOGOUT_SUCCESS,
    response,
  };
}

export function getLogoutFail(error) {
  return {
    type: LOGOUT_FAIL,
    error,
  };
}
