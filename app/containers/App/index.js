/**
 *
 * App
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import axios from 'axios';
import LoginPage from 'containers/LoginPage/Loadable';
import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getLogout, saveCurrentUser, changeAppStoreData } from './actions';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token',
)}`;
export function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  const { loading, currentUser, showLogout } = props.app;
  useEffect(() => {
    props.saveCurrentUser(localStorage.getItem('user') || {});
  }, []);
  return (
    <AppWrapper>
      <Helmet>
        <title>App</title>
        <meta name="description" content="Description of App" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="" component={LoginPage} />
      </Switch>
      {loading && <LoadingIndicator />}
    </AppWrapper>
  );
}

App.propTypes = {
  getLogout: PropTypes.func,
  saveCurrentUser: PropTypes.func,
  changeStoreData: PropTypes.func,
  app: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLogout: () => {
      dispatch(getLogout());
    },
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
