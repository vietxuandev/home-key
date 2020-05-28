/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import { GET_PROFILE_SUCCESS, GET_PROFILE_FAIL } from './constants';

export const initialState = {
  profile: {},
  profileError: [],
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROFILE_SUCCESS:
        draft.profile = action.response;
        break;
      case GET_PROFILE_FAIL:
        draft.profileError = action.error.errors;
        break;
    }
  });

export default profilePageReducer;
