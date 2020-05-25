/**
 *
 * App
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import axios from 'axios';
import AuthPage from 'containers/AuthPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import MotelPage from 'containers/MotelPage/Loadable';
import RoomPage from 'containers/RoomPage/Loadable';
import MotelRoom from 'containers/MotelRoom/Loadable';
import Logout from 'containers/Logout/Loadable';
import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoadingIndicator from '../../components/LoadingIndicator';
import { saveCurrentUser, changeAppStoreData } from './actions';
import MenuAppBar from '../../components/MenuAppBar/Loadable';
import localStore from 'local-storage';
import './style.scss';

axios.defaults.headers.common.Authorization = `Bearer ${localStore.get(
  'token',
)}`;
export function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  const { loading, currentUser, showLogout } = props.app;
  const handleClose = () => {
    props.changeStoreData('showLogout', false);
  };
  useEffect(() => {
    props.saveCurrentUser(localStore.get('user')) || {};
  }, []);
  return (
    <div className="app-wrapper">
      <MenuAppBar
        currentUser={currentUser}
        changeStoreData={props.changeStoreData}
      />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/motel/:id" component={MotelPage} />
        <Route path="/room/:id" component={RoomPage} />
        <Route path="/motel-room/:id" component={MotelRoom} />
      </Switch>
      {loading && <LoadingIndicator />}
      <Logout open={showLogout} handleClose={handleClose} />
    </div>
  );
}

App.propTypes = {
  saveCurrentUser: PropTypes.func,
  app: PropTypes.object,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveCurrentUser: user => {
      dispatch(saveCurrentUser(user));
    },
    changeStoreData(key, value) {
      dispatch(changeAppStoreData(key, value));
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
)(App);
