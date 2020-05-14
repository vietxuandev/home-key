/*
 *
 * HomePage actions
 *
 */

import { GET_MOTELS, GET_MOTELS_SUCCESS, GET_MOTELS_FAIL } from './constants';

export function getMotels() {
  return {
    type: GET_MOTELS,
  };
}

export function getMotelsSuccess(response) {
  return {
    type: GET_MOTELS_SUCCESS,
    response,
  };
}

export function getMotelsFail(error) {
  return {
    type: GET_MOTELS_FAIL,
    error,
  };
}
