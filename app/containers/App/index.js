/**
 *
 * App
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import axios from 'axios';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoadingIndicator from '../../components/LoadingIndicator';
import { saveCurrentUser } from './actions';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token',
)}`;
export function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  const { loading } = props.app;
  useEffect(() => {
    props.saveCurrentUser(localStorage.getItem('user') || {});
  }, []);
  return (
    <div>
      <Helmet>
        <title>App</title>
        <meta name="description" content="Description of App" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="" component={LoginPage} />
      </Switch>
      {loading && <LoadingIndicator />}
    </div>
  );
}

App.propTypes = {
  saveCurrentUser: PropTypes.func,
  app: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveCurrentUser: user => {
      dispatch(saveCurrentUser(user));
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
