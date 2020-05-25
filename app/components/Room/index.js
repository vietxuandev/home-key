/**
 *
 * Room
 *
 */

import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import ClassNames from 'classnames';
import './style.scss';

const visibleStyles = { opacity: 1 };
const hiddenStyles = { opacity: 0 };

function Room(props) {
  const { item = {}, status = '' } = props;
  const history = useHistory();
  const visibleRoom = status === 'all' || item.status === status ? true : false;
  return (
    <div
      className={ClassNames('room-box', item.status)}
      onClick={
        visibleRoom
          ? () => {
              history.push(`/room/${item._id}`);
            }
          : null
      }
      style={visibleRoom ? visibleStyles : hiddenStyles}
    >
      <div className="name">
        {item.status === 'unknown' ? 'Chưa cập nhật' : `Phòng ${item.name}`}
      </div>
      <div className="price">
        {item.status === 'unknown' ? 'unknown' : `${item.acreage} m2`}
      </div>
    </div>
  );
}

Room.propTypes = {};

export default memo(Room);
