/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import localStore from 'local-storage';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !localStore.get('user') ? (
          <Redirect to="/auth/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {};

export default PrivateRoute;
