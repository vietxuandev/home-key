/*
 *
 * App actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  SAVE_CURRENT_USER,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CHANGE_APP_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function saveCurrentUser(user) {
  return {
    type: SAVE_CURRENT_USER,
    user,
  };
}

export function getLogout() {
  return {
    type: LOGOUT,
  };
}

export function getLogoutSuccess(response) {
  return {
    type: LOGOUT_SUCCESS,
    response,
  };
}

export function getLogoutFail(error) {
  return {
    type: LOGOUT_FAIL,
    error,
  };
}

export function changeAppStoreData(key, value) {
  return {
    type: CHANGE_APP_STORE_DATA,
    key,
    value,
  };
}
