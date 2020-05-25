/**
 *
 * HomePage
 *
 */

import React, {
  memo,
  useEffect,
  useState,
  Fragment,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Link } from 'react-router-dom';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import MotelMarker from '../../components/MotelMarker/Loadable';
import { getMotels } from './actions';
import _ from 'lodash';
import './style.scss';
import Money from '../../helper/format';
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
      {!_.isEmpty(motel) && (
        <Fragment>
          <div className="status-wrapper container">
            <div className="status">
              <div className="green-box" />
              Còn phòng
            </div>
            <div className="status">
              <div className="red-box" />
              Hết phòng
            </div>
            <div className="status">
              <div className="orange-box" />
              Sắp hết hạn
            </div>
          </div>
          <div className="detail-wrapper">
            <div className="container">
              <button
                onClick={() => {
                  setMotel({});
                }}
                type="button"
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <Link to={`/motel/${motel._id}`}>
                <div className="row">
                  <div className="col-4 full-image">
                    <img
                      className="image"
                      src="/defaul-room.jpg"
                      alt="defaul room"
                    />
                  </div>
                  <div className="col-8">
                    <div className="title">{motel.name}</div>
                    <div className="address">{motel.address.address}</div>
                    <div className="price">{Money(motel.price)}</div>
                    <div className="phone">{motel.contactPhone}</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Fragment>
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
