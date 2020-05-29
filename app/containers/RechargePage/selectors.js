import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rechargePage state domain
 */

const selectRechargePageDomain = state => state.rechargePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RechargePage
 */

const makeSelectRechargePage = () =>
  createSelector(
    selectRechargePageDomain,
    substate => substate,
  );

export default makeSelectRechargePage;
export { selectRechargePageDomain };
