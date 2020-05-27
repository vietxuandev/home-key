/**
 *
 * MotelMarker
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { OverlayView } from '@react-google-maps/api';
import localStore from 'local-storage';
import './style.scss';
import Money from '../../helper/format';
function MotelMarker(props) {
  const listReview = localStore.get('listReview');
  const [backgroundColor, setBackgroundColor] = useState('green');
  const { motel = {}, setMotel = () => {} } = props;
  useEffect(() => {
    /* eslint no-underscore-dangle: 0 */
    if (listReview && listReview.includes(motel._id)) {
      setBackgroundColor('grey');
    } else if (motel.availableRoom > 0) {
      setBackgroundColor('green');
    } else if (motel.depositedRoom > 0) {
      setBackgroundColor('orange');
    } else {
      setBackgroundColor('red');
    }
  }, [listReview]);
  const handelClick = () => {
    setMotel(motel);
    if (listReview) {
      /* eslint no-underscore-dangle: 0 */
      if (!listReview.includes(motel._id)) {
        /* eslint no-underscore-dangle: 0 */
        localStore.set('listReview', [...listReview, motel._id]);
      }
    } else {
      /* eslint no-underscore-dangle: 0 */
      localStore.set('listReview', [motel._id]);
    }
    setBackgroundColor('grey');
  };
  return (
    <OverlayView
      position={motel.address.geometry.location}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <button
        className="motel-marker-wrapper"
        style={{ backgroundColor, color: backgroundColor }}
        onClick={handelClick}
        type="button"
      >
        <span className="price" style={{ backgroundColor }}>
          {Money(motel.price)}
        </span>
      </button>
    </OverlayView>
  );
}

MotelMarker.propTypes = {
  motel: PropTypes.object,
  setMotel: PropTypes.func,
};

export default MotelMarker;
