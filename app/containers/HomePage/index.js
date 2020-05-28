/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import _ from 'lodash';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import MotelMarker from '../../components/MotelMarker/Loadable';
import { getMotels } from './actions';
import MotelCard from '../../components/MotelCard';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  box: {
    border: '1px solid rgba(0, 0, 0, 0.2)',
    display: 'inline',
    marginRight: 10,
    padding: '0px 15px',
  },
  detail: {
    marginBottom: 10,
    maxWidth: 800,
    margin: 'auto',
  },
  status: {
    textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
    fontWeight: 'bold',
    padding: '0px 10px',
    marginBottom: 10,
  },
}));

const mapContainerStyle = {
  height: '100%',
  width: '100%',
};

const center = { lat: 10.856866, lng: 106.763324 };

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const classes = useStyles();
  const [motel, setMotel] = useState({});
  useEffect(() => {
    props.getMotels();
  }, []);
  const { isLoaded } = useLoadScript({
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
  const renderMap = () => (
    <GoogleMap
      id="maps-page"
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={center}
    >
      {motels.map(item => (
        /* eslint no-underscore-dangle: 0 */
        <MotelMarker setMotel={setMotel} motel={item} key={item._id} />
      ))}
    </GoogleMap>
  );
  return (
    <div
      className="home-page-wrapper"
      style={{ height: width < 600 ? height - 56 : height - 64 }}
    >
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      {isLoaded && renderMap()}
      <div className={classes.root}>
        <Grid justify="center" container className={classes.detail}>
          <Grid item xs={12}>
            <Grid container spacing={1} className={classes.status}>
              <Grid item xs={4}>
                <Box
                  className={classes.box}
                  style={{ backgroundColor: 'green' }}
                />
                <span>Còn phòng</span>
              </Grid>
              <Grid item xs={4}>
                <Box
                  className={classes.box}
                  style={{ backgroundColor: 'red' }}
                />
                <span>Hết phòng</span>
              </Grid>
              <Grid item xs={4}>
                <Box
                  className={classes.box}
                  style={{ backgroundColor: 'orange' }}
                />
                <span>Sắp hết hạn</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {!_.isEmpty(motel) && (
              <MotelCard motel={motel} setMotel={setMotel} />
            )}
          </Grid>
        </Grid>
      </div>
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
