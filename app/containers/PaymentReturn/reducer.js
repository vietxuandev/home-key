/*
 *
 * PaymentReturn reducer
 *
 */
import produce from 'immer';
import { GET_CALLBACK_SUCCESS } from './constants';

export const initialState = {
  paymentError: [],
};

/* eslint-disable default-case, no-param-reassign */
const paymentReturnReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CALLBACK_SUCCESS:
        break;
    }
  });

export default paymentReturnReducer;
