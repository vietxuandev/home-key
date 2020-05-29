/*
 *
 * PaymentReturn actions
 *
 */

import {
  GET_CALLBACK_FAIL,
  GET_CALLBACK,
  GET_CALLBACK_SUCCESS,
} from './constants';

export function getCallBack(queryString) {
  return {
    type: GET_CALLBACK,
    queryString,
  };
}

export function getCallBackSuccess(response) {
  return {
    type: GET_CALLBACK_SUCCESS,
    response,
  };
}

export function getCallBackFail(error) {
  return {
    type: GET_CALLBACK_FAIL,
    response,
  };
}
