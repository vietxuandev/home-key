/**
 *
 * MotelMarker
 *
 */

import React, { useState, useEffect } from 'react';
import { OverlayView } from '@react-google-maps/api';
import './style.scss';
function MotelMarker(props) {
  const listReview = JSON.parse(localStorage.getItem('listReview'));
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
  return (
    <OverlayView
      position={motel.address.geometry.location}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        className="motel-marker-wrapper"
        style={{ backgroundColor: backgroundColor, color: backgroundColor }}
        onClick={() => {
          setMotel(motel);
          console.log(listReview);
          if (listReview) {
            if (!listReview.includes(motel._id)) {
              /* eslint no-underscore-dangle: 0 */
              localStorage.setItem(
                'listReview',
                JSON.stringify([...listReview, motel._id]),
              );
            }
          } else {
            /* eslint no-underscore-dangle: 0 */
            localStorage.setItem('listReview', JSON.stringify([motel._id]));
          }
          setBackgroundColor('grey');
        }}
      >
        <span className="price" style={{ backgroundColor }}>
          {motel.price}
        </span>
      </div>
    </OverlayView>
  );
}

MotelMarker.propTypes = {};

export default MotelMarker;
