/**
 *
 * Room
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ClassNames from 'classnames';
import './style.scss';

const visibleStyles = { opacity: 1 };
const hiddenStyles = { opacity: 0 };

function Room(props) {
  const { item = {}, status = '' } = props;
  const history = useHistory();
  const visibleRoom = status === 'all' || item.status === status;
  const handleClick = () => {
    if (visibleRoom) {
      /* eslint no-underscore-dangle: 0 */
      history.push(`/room/${item._id}`);
    }
  };
  return (
    <button
      className={ClassNames('room-box', item.status)}
      onClick={handleClick}
      style={visibleRoom ? visibleStyles : hiddenStyles}
      type="button"
    >
      <div className="name">
        {item.status === 'unknown'
          ? 'Chưa cập nhật'
          : `P.${item.key.split('-')[0][1]}${item.name}`}
      </div>
      <div className="price">
        {item.status === 'unknown' ? 'unknown' : `${item.acreage} m2`}
      </div>
    </button>
  );
}

Room.propTypes = {
  item: PropTypes.object,
  status: PropTypes.string,
};

export default memo(Room);
