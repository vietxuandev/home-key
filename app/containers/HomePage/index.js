/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import MotelMarker from '../../components/MotelMarker/Loadable';
import { getMotels } from './actions';
import _ from 'lodash';
import './style.scss';
import MotelCard from '../../components/MotelCard';

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const center = { lat: 10.856866, lng: 106.763324 };

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const { getMotels = () => {} } = props;
  const [motel, setMotel] = useState({});
  useEffect(() => {
    getMotels();
  }, []);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAXvk9NdxYIlpimxCnviGvuvX7LT3GodDM',
  });
  const { motels = [] } = props.homePage;
  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      const updateSize = () => {
        setSize([window.innerWidth, window.innerHeight]);
      };
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  };
  const [width, height] = useWindowSize();
  const renderMap = () => {
    return (
      <GoogleMap
        id="maps-page"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
      >
        {motels.map(motel => (
          <MotelMarker setMotel={setMotel} motel={motel} key={motel._id} />
        ))}
      </GoogleMap>
    );
  };
  return (
    <div
      className="home-page-wrapper"
      style={{ height: width < 600 ? height - 56 : height - 64 }}
    >
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      {loadError ? (
        <div style={mapContainerStyle}>
          Map cannot be loaded right now, sorry.
        </div>
      ) : isLoaded ? (
        renderMap()
      ) : null}
      <div className="status-wrapper">
        <Container maxWidth="md">
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <div className="green-box" />
              Còn phòng
            </Grid>
            <Grid item xs={4}>
              <div className="red-box" />
              Hết phòng
            </Grid>
            <Grid item xs={4}>
              <div className="orange-box" />
              Sắp hết hạn
            </Grid>
          </Grid>
        </Container>
      </div>
      {!_.isEmpty(motel) && (
        <div className="detail-wrapper">
          <MotelCard motel={motel} setMotel={setMotel} />
        </div>
      )}
    </div>
  );
}

HomePage.propTypes = {
  getMotels: PropTypes.func,
  homePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotels: () => {
      dispatch(getMotels());
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
)(HomePage);
