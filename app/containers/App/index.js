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
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import axios from 'axios';
import AuthPage from 'containers/AuthPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import MotelPage from 'containers/MotelPage/Loadable';
import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoadingIndicator from '../../components/LoadingIndicator';
import { saveCurrentUser, changeAppStoreData } from './actions';
import Header from '../../components/Header';
import localStore from 'local-storage';
import './style.scss';

axios.defaults.headers.common.Authorization = `Bearer ${localStore.get(
  'token',
)}`;
export function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  const { loading, currentUser, showLogout } = props.app;
  useEffect(() => {
    props.saveCurrentUser(localStore.get('user')) || {};
  }, []);
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header
          currentUser={currentUser}
          changeStoreData={props.changeStoreData}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/motel/:id" component={MotelPage} />
        </Switch>
        {loading && <LoadingIndicator />}
      </BrowserRouter>
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
