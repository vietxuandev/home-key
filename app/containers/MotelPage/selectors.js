import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the motelPage state domain
 */

const selectMotelPageDomain = state => state.motelPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MotelPage
 */

const makeSelectMotelPage = () =>
  createSelector(
    selectMotelPageDomain,
    substate => substate,
  );

export default makeSelectMotelPage;
export { selectMotelPageDomain };
