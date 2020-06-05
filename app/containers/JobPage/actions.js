/*
 *
 * JobPage actions
 *
 */

import {
  POST_JOB,
  POST_JOB_SUCCESS,
  POST_JOB_FAIL,
  PUT_PAY,
  PUT_PAY_SUCCESS,
  PUT_PAY_FAIL,
} from './constants';

export function postJob(formData) {
  return {
    type: POST_JOB,
    formData,
  };
}

export function postJobSuccess(response) {
  return {
    type: POST_JOB_SUCCESS,
    response,
  };
}

export function postJobFail(error) {
  return {
    type: POST_JOB_FAIL,
    error,
  };
}
