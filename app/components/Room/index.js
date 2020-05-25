/**
 *
 * Room
 *
 */

import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import ClassNames from 'classnames';
import './style.scss';

function Room(props) {
  const { item = {}, status = '' } = props;
  const history = useHistory();
  return (
    <div
      className={ClassNames('room-box', item.status)}
      onClick={() => {
        history.push(`/room/${item._id}`);
      }}
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