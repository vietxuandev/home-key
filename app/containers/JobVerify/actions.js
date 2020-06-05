/*
 *
 * JobVerify actions
 *
 */

import { PUT_IMAGES, PUT_IMAGES_SUCCESS, PUT_IMAGES_FAIL } from './constants';

export function putImages(id, formData) {
  return {
    type: PUT_IMAGES,
    id,
    formData,
  };
}

export function putImagesSuccess(response) {
  return {
    type: PUT_IMAGES_SUCCESS,
    response,
  };
}

export function putImagesFail(error) {
  return {
    type: PUT_IMAGES_FAIL,
    error,
  };
}
