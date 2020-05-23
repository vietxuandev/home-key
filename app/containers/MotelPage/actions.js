/*
 *
 * MotelPage actions
 *
 */

import { GET_MOTEL, GET_MOTEL_SUCCESS, GET_MOTEL_FAIL } from './constants';

export function getMotel(id) {
  return {
    type: GET_MOTEL,
    id,
  };
}

export function getMotelSuccess(response) {
  return {
    type: GET_MOTEL_SUCCESS,
    response,
  };
}

export function getMotelFail(error) {
  return {
    type: GET_MOTEL_FAIL,
    error,
  };
}
