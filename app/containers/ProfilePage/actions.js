/*
 *
 * ProfilePage actions
 *
 */

import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_JOBS,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAIL,
} from './constants';

export function getProfile() {
  return {
    type: GET_PROFILE,
  };
}

export function getProfileSuccess(response) {
  return {
    type: GET_PROFILE_SUCCESS,
    response,
  };
}

export function getProfileFail(error) {
  return {
    type: GET_PROFILE_FAIL,
    error,
  };
}

export function getJobs() {
  return {
    type: GET_JOBS,
  };
}

export function getJobsSuccess(response) {
  return {
    type: GET_JOBS_SUCCESS,
    response,
  };
}

export function getJobsFail(error) {
  return {
    type: GET_JOBS_FAIL,
    error,
  };
}
