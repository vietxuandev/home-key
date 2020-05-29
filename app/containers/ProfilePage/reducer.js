/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAIL,
} from './constants';

export const initialState = {
  profile: {},
  jobs: [],
  profileError: [],
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROFILE_SUCCESS:
        draft.profile = action.response;
        break;
      case GET_JOBS_SUCCESS:
        draft.jobs = action.response.data;
        break;
      case GET_JOBS_FAIL:
      case GET_PROFILE_FAIL:
        draft.profileError = action.error.errors;
        break;
    }
  });

export default profilePageReducer;
