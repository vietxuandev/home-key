/*
 *
 * ProfilePage actions
 *
 */

import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
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
