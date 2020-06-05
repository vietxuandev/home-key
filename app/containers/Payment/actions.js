/*
 *
 * Payment actions
 *
 */

import {
  PUT_PAY,
  PUT_PAY_SUCCESS,
  PUT_PAY_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function putPay(id) {
  return {
    type: PUT_PAY,
    id,
  };
}

export function putPaySuccess(response) {
  return {
    type: PUT_PAY_SUCCESS,
    response,
  };
}

export function putPayFail(error) {
  return {
    type: PUT_PAY_FAIL,
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
