/*
 *
 * RoomPage actions
 *
 */

import { GET_ROOM, GET_ROOM_SUCCESS, GET_ROOM_FAIL } from './constants';

export function getRoom(id) {
  return {
    type: GET_ROOM,
    id,
  };
}

export function getRoomSuccess(response) {
  return {
    type: GET_ROOM_SUCCESS,
    response,
  };
}

export function getRoomFail(error) {
  return {
    type: GET_ROOM_FAIL,
    error,
  };
}
