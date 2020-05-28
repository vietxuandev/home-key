import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jobPage state domain
 */

const selectJobPageDomain = state => state.jobPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JobPage
 */

const makeSelectJobPage = () =>
  createSelector(
    selectJobPageDomain,
    substate => substate,
  );

export default makeSelectJobPage;
export { selectJobPageDomain };
