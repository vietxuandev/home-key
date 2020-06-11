/*
 *
 * Payment reducer
 *
 */
import produce from 'immer';
import { PUT_PAY_FAIL, PUT_PAY_SUCCESS, CHANGE_STORE_DATA } from './constants';
import { GET_JOB_SUCCESS } from '../JobDetail/constants';

export const initialState = {
  job: {},
  status: {},
  paymentError: [],
};

/* eslint-disable default-case, no-param-reassign */
const paymentReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PUT_PAY_SUCCESS:
        draft.status = action.response;
        break;
      case PUT_PAY_FAIL:
        draft.paymentError = action.error.errors;
        break;
      case GET_JOB_SUCCESS:
        draft.job = action.response;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default paymentReducer;
