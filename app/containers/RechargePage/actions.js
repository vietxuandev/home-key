/*
 *
 * RechargePage actions
 *
 */

import {
  POST_RECHARGE,
  POST_RECHARGE_SUCCESS,
  POST_RECHARGE_FAIL,
} from './constants';

export function postRecharge(amount) {
  return {
    type: POST_RECHARGE,
    amount,
  };
}

export function postRechargeSuccess(response) {
  return {
    type: POST_RECHARGE_SUCCESS,
    response,
  };
}

export function postRechargeFail(error) {
  return {
    type: POST_RECHARGE_FAIL,
    error,
  };
}
