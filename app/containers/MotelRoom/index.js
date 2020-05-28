/**
 *
 * MotelRoom
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMotelRoom from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getMotel } from './actions';
import ClassNames from 'classnames';
import './style.scss';
import FloorDetail from '../../components/FloorDetail/Loadable';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
}));

export function MotelRoom(props) {
  useInjectReducer({ key: 'motelRoom', reducer });
  useInjectSaga({ key: 'motelRoom', saga });
  const classes = useStyles();
  const { id } = useParams();
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
    <div className={'motel-room-wrapper'}>
      <Helmet>
        <title>MotelRoom</title>
        <meta name="description" content="Description of MotelRoom" />
      </Helmet>
      <Grid container className="status-bar">
        <Grid
          item
          xs={3}
          className={ClassNames('status-item total', {
            active: status === 'all',
          })}
          onClick={() => {
            status !== 'all' && setStatus('all');
          }}
        >
          <div className="content">Tất cả</div>
          <div className="quantity">({totalRoom})</div>
        </Grid>
        <Grid
          item
          xs={3}
          className={ClassNames('status-item rented', {
            active: status === 'rented',
          })}
          onClick={() => {
            status !== 'rented' && setStatus('rented');
          }}
        >
          <div className="content">Đã thuê</div>
          <div className="quantity">({rentedRoom})</div>
        </Grid>
        <Grid
          item
          xs={3}
          className={ClassNames('status-item available', {
            active: status === 'available',
          })}
          onClick={() => {
            status !== 'available' && setStatus('available');
          }}
        >
          <div className="content">Còn trống</div>
          <div className="quantity">({availableRoom})</div>
        </Grid>
        <Grid
          item
          xs={3}
          className={ClassNames('status-item deposited', {
            active: status === 'deposited',
          })}
          onClick={() => {
            status !== 'deposited' && setStatus('deposited');
          }}
        >
          <div className="content">Đặt cọc</div>
          <div className="quantity">({depositedRoom})</div>
        </Grid>
      </Grid>
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
