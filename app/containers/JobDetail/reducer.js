/*
 *
 * JobDetail reducer
 *
 */
import produce from 'immer';
import { GET_JOB_SUCCESS, GET_JOB_FAIL } from './constants';

export const initialState = {
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
    }
  });

export default jobDetailReducer;
