/**
 *
 * AuthPage
 *
 */

import React, { memo, useLayoutEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import LoginPage from 'containers/LoginPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import Bacground from '../../images/background.jpg';

import { urlLink } from '../../helper/route';

const useStyles = makeStyles(theme => ({
  root: {
    background: `url(${Bacground}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export function AuthPage() {
  const classes = useStyles();
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
  return (
    <div
      className={classes.root}
      style={{ height: width < 600 ? height - 56 : height - 64 }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Paper
            elevation={4}
            style={{ padding: '30px 15px', marginTop: '20px' }}
          >
            <Switch>
              <Route path={urlLink.auth.sign_in} component={LoginPage} />
              <Route path={urlLink.auth.sign_up} component={SignUpPage} />
              <Route path="/" component={LoginPage} />
            </Switch>
          </Paper>
        </div>
      </Container>
    </div>
  );
}

AuthPage.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AuthPage);
