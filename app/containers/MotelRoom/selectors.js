import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the motelRoom state domain
 */

const selectMotelRoomDomain = state => state.motelRoom || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MotelRoom
 */

const makeSelectMotelRoom = () =>
  createSelector(
    selectMotelRoomDomain,
    substate => substate,
  );

export default makeSelectMotelRoom;
export { selectMotelRoomDomain };
