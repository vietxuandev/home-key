/*
 *
 * JobDetail actions
 *
 */

import { GET_JOB, GET_JOB_SUCCESS, GET_JOB_FAIL } from './constants';

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
