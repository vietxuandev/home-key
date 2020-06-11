/*
 *
 * JobDetail actions
 *
 */

import {
  GET_JOB,
  GET_JOB_SUCCESS,
  GET_JOB_FAIL,
  PUT_ACTIVE,
  PUT_ACTIVE_SUCCESS,
  PUT_ACTIVE_FAIL,
  PUT_CHECKOUT,
  PUT_CHECKOUT_SUCCESS,
  PUT_CHECKOUT_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function getJob(id) {
  return {
    type: GET_JOB,
    id,
  };
}

export function getJobSuccess(response) {
  return {
    type: GET_JOB_SUCCESS,
    response,
  };
}

export function getJobFail(error) {
  return {
    type: GET_JOB_FAIL,
    error,
  };
}

export function putActive(id) {
  return {
    type: PUT_ACTIVE,
    id,
  };
}

export function putActiveSuccess(response) {
  return {
    type: PUT_ACTIVE_SUCCESS,
    response,
  };
}

export function putActiveFail(error) {
  return {
    type: PUT_ACTIVE_FAIL,
    error,
  };
}

export function putCheckOut(id, returnRoomDate) {
  return {
    type: PUT_CHECKOUT,
    id,
    returnRoomDate,
  };
}

export function putCheckOutSuccess(response) {
  return {
    type: PUT_CHECKOUT_SUCCESS,
    response,
  };
}

export function putCheckOutFail(error) {
  return {
    type: PUT_CHECKOUT_FAIL,
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
