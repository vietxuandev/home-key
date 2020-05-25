/**
 *
 * MotelRoom
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMotelRoom from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getMotel } from './actions';
import ClassNames from 'classnames';
import './style.scss';
import FloorDetail from '../../components/FloorDetail/Loadable';

export function MotelRoom(props) {
  useInjectReducer({ key: 'motelRoom', reducer });
  useInjectSaga({ key: 'motelRoom', saga });
  const { id } = props.match.params;
  const [status, setStatus] = useState('all');
  useEffect(() => {
    props.getMotel(id);
  }, []);
  const { motel = {} } = props.motelRoom;
  const {
    totalRoom = 0,
    rentedRoom = 0,
    availableRoom = 0,
    depositedRoom = 0,
  } = motel;
  return (
    <div className="motel-room-wrapper">
      <Helmet>
        <title>MotelRoom</title>
        <meta name="description" content="Description of MotelRoom" />
      </Helmet>
      <div className="status-bar">
        <div
          className={ClassNames('status-item total', {
            active: status === 'all',
          })}
          onClick={() => {
            status !== 'all' && setStatus('all');
          }}
        >
          <div className="content">Tất cả</div>
          <div className="quantity">({totalRoom})</div>
        </div>
        <div
          className={ClassNames('status-item rented', {
            active: status === 'rented',
          })}
          onClick={() => {
            status !== 'rented' && setStatus('rented');
          }}
        >
          <div className="content">Đã thuê</div>
          <div className="quantity">({rentedRoom})</div>
        </div>
        <div
          className={ClassNames('status-item available', {
            active: status === 'available',
          })}
          onClick={() => {
            status !== 'available' && setStatus('available');
          }}
        >
          <div className="content">Còn trống</div>
          <div className="quantity">({availableRoom})</div>
        </div>
        <div
          className={ClassNames('status-item deposited', {
            active: status === 'deposited',
          })}
          onClick={() => {
            status !== 'deposited' && setStatus('deposited');
          }}
        >
          <div className="content">Đặt cọc</div>
          <div className="quantity">({depositedRoom})</div>
        </div>
      </div>
      <FloorDetail floors={motel.floors} owner={motel.owner} status={status} />
    </div>
  );
}

MotelRoom.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  motelRoom: makeSelectMotelRoom(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotel: id => {
      dispatch(getMotel(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MotelRoom);
