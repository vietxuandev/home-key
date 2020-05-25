import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the logout state domain
 */

const selectLogoutDomain = state => state.logout || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Logout
 */

const makeSelectLogout = () =>
  createSelector(
    selectLogoutDomain,
    substate => substate,
  );

export default makeSelectLogout;
export { selectLogoutDomain };
