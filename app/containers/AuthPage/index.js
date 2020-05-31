/**
 *
 * AuthPage
 *
 */

import React, { memo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import LoginPage from 'containers/LoginPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';

import { urlLink } from '../../helper/route';
import PaperWrapper from '../../components/PaperWrapper/Loadable';

export function AuthPage() {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <PaperWrapper>
          <Switch>
            <Route path={urlLink.auth.sign_in} component={LoginPage} />
            <Route path={urlLink.auth.sign_up} component={SignUpPage} />
            <Route path="/" component={LoginPage} />
          </Switch>
        </PaperWrapper>
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
