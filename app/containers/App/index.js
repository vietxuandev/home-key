/**
 *
 * App
 *
 */

import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import JobPage from 'containers/JobPage/Loadable';
import JobVerify from 'containers/JobVerify/Loadable';
import JobDetail from 'containers/JobDetail/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import RechargePage from 'containers/RechargePage/Loadable';
import Payment from 'containers/Payment/Loadable';
import PaymentReturn from 'containers/PaymentReturn/Loadable';
import localStore from 'local-storage';
import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import { saveCurrentUser, changeAppStoreData, getLogout } from './actions';
import MenuAppBar from '../../components/MenuAppBar/Loadable';
import AlertDialog from '../../components/AlertDialog/Loadable';
import ErrorDialog from '../../components/ErrorDialog/Loadable';
import { Toolbar } from '@material-ui/core';
import Bacground from '../../images/background.jpg';
import PrivateRoute from '../../components/PrivateRoute';

axios.defaults.headers.common.Authorization = `Bearer ${localStore.get(
  'token',
)}`;

const useStyles = makeStyles(theme => ({
  root: {
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    background: `url(${Bacground}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  const classes = useStyles();
  const {
    loading = false,
    currentUser = {},
    showAlert = false,
    showError = false,
    alert = {},
    error = {},
  } = props.app;
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
  const handleShowLogout = () => {
    props.changeStoreData('showAlert', true);
    props.changeStoreData('alert', {
      title: 'Đăng xuất',
      content: 'Tài khoảng của bạn sẽ bị đăng xuất khỏi thiết bị!',
      callBack: () => {
        props.getLogout();
      },
    });
  };
  useEffect(() => {
    props.saveCurrentUser(localStore.get('user'));
  }, []);

  return (
    <div>
      <MenuAppBar
        currentUser={currentUser}
        handleShowLogout={handleShowLogout}
      />
      <Toolbar />
      <div
        className={classes.root}
        style={{ height: width < 600 ? height - 56 : height - 64 }}
      >
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/motel/:id" component={MotelPage} />
          <Route path="/motel-room/:id" component={MotelRoom} />
          <Route path="/room/:id" component={RoomPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/recharge" component={RechargePage} />
          <PrivateRoute path="/payment/:id" component={Payment} />
          <PrivateRoute path="/payment-return" component={PaymentReturn} />
          <PrivateRoute path="/job/:id" component={JobPage} />
          <PrivateRoute path="/job-verify/:id" component={JobVerify} />
          <PrivateRoute path="/job-detail/:id" component={JobDetail} />
        </Switch>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress />
        </Backdrop>
        <AlertDialog
          open={showAlert}
          alert={alert}
          handleClose={() => {
            props.changeStoreData('showAlert', false);
          }}
        />
        <ErrorDialog
          open={showError}
          error={error}
          handleClose={() => {
            props.changeStoreData('showError', false);
          }}
        />
      </div>
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
    getLogout() {
      dispatch(getLogout());
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
