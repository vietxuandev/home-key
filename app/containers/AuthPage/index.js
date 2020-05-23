/**
 *
 * AuthPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Grid, Paper } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { urlLink } from '../../helper/route';
import LoginPage from 'containers/LoginPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';

export function AuthPage() {
  return (
    <div className="auth-page-wrapper">
      <Grid container justify="center" alignContent="center">
        <Grid item xs={8} md={6}>
          <Paper
            elevation={4}
            style={{ padding: '20px 15px', marginTop: '30px' }}
          >
            <Switch>
              <Route path={urlLink.auth.sign_in} component={LoginPage} />
              <Route path={urlLink.auth.sign_up} component={SignUpPage} />
              <Route path="/" component={LoginPage} />
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

AuthPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

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
