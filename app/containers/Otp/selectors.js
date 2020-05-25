import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the otp state domain
 */

const selectOtpDomain = state => state.otp || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Otp
 */

const makeSelectOtp = () =>
  createSelector(
    selectOtpDomain,
    substate => substate,
  );

export default makeSelectOtp;
export { selectOtpDomain };
