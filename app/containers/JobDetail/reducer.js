/*
 *
 * JobDetail reducer
 *
 */
import produce from 'immer';
import { GET_JOB_SUCCESS, GET_JOB_FAIL, CHANGE_STORE_DATA } from './constants';
import { GET_PROFILE_SUCCESS } from '../ProfilePage/constants';

export const initialState = {
  profile: {},
  job: {},
  jobErrors: [],
};

/* eslint-disable default-case, no-param-reassign */
const jobDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_JOB_SUCCESS:
        draft.job = action.response;
        break;
      case GET_JOB_FAIL:
        draft.job = action.error.errors;
        break;
      case GET_PROFILE_SUCCESS:
        draft.profile = action.response;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default jobDetailReducer;
