/**
 *
 * MotelPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useParams } from 'react-router';
import makeSelectMotelPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ClassNames from 'classnames';
import './style.scss';
import { getMotel } from './actions';
import FloorDetail from '../../components/FloorDetail/Loadable';

export function MotelPage(props) {
  useInjectReducer({ key: 'motelPage', reducer });
  useInjectSaga({ key: 'motelPage', saga });
  const { id } = props.match.params;
  const [status, setStatus] = useState('all');
  useEffect(() => {
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      // fade out
      ele.classList.add('available');
      setTimeout(() => {
        // remove from DOM
        const nele = document.getElementById('ipl-progress-indicator');
        if (nele) {
          nele.outerHTML = '';
        }
      }, 2000);
    }
  }, []);
  useEffect(() => {
    props.getMotel(id);
  }, []);
  const { motel = {} } = props.motelPage;
  const {
    totalRoom = 0,
    rentedRoom = 0,
    availableRoom = 0,
    depositedRoom = 0,
  } = motel;
  return (
    <div className="motel-detail-wrapper">
      <Helmet>
        <title>MotelPage</title>
        <meta name="description" content="Description of MotelPage" />
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
      <FloorDetail {...props} owner={motel.owner} status={status} />
    </div>
  );
}

MotelPage.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  motelPage: makeSelectMotelPage(),
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
)(MotelPage);
