/*
 *
 * Logout reducer
 *
 */
import produce from 'immer';
import {} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const logoutReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      default:
        break;
    }
  });

export default logoutReducer;
