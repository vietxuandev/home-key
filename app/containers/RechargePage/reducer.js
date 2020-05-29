/*
 *
 * RechargePage reducer
 *
 */
import produce from 'immer';
import { POST_RECHARGE_SUCCESS, POST_RECHARGE_FAIL } from './constants';

export const initialState = {
  rechargeError: [],
};

/* eslint-disable default-case, no-param-reassign */
const rechargePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_RECHARGE_SUCCESS:
        break;
      case POST_RECHARGE_FAIL:
        draft.rechargeError = action.error.errors;
        break;
    }
  });

export default rechargePageReducer;
