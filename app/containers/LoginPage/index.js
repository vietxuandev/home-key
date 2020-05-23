/**
 *
 * LoginPage
 *
 */

import React, { memo, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import './style.scss';
import { postLogin } from './actions';
import {
  InputAdornment,
  IconButton,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const { loginErrors = [] } = props.loginPage;
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  useEffect(() => {
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      // fade out
      ele.classList.add('available');
      setTimeout(() => {
        // remove from DOM
        const nele = document.getElementById('ipl-progress-indicator');
        if (nele) {
          nele.outerHTML = '';
        }
      }, 2000);
    }
  }, []);
  return (
    <div className="login-wrapper">
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      {loginErrors.length > 0 && (
        <Alert severity="error">
          {loginErrors.map(error => error.errorMessage)}
        </Alert>
      )}
      <Formik
        initialValues={{
          phoneNumber: '',
          password: '',
          showPassword: false,
        }}
        enableReinitialize
        onSubmit={env => props.postLogin(env)}
        validationSchema={Yup.object().shape({
          phoneNumber: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Field name="phoneNumber">
              {({ field }) => (
                <TextField
                  style={{ margin: '10px 0' }}
                  label="Phone number"
                  variant="outlined"
                  required
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  fullWidth
                  size="small"
                  {...field}
                />
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <TextField
                  style={{ margin: '10px 0' }}
                  label="Password"
                  variant="outlined"
                  required
                  type={values.showPassword ? 'text' : 'password'}
                  helperText={touched.password && errors.password}
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setFieldValue('showPassword', !values.showPassword)
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...field}
                />
              )}
            </Field>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={
                !values.phoneNumber || !values.password || !_.isEmpty(errors)
              }
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

LoginPage.propTypes = {
  postLogin: PropTypes.func,
  loginPage: PropTypes.object,
  touched: PropTypes.bool,
  errors: PropTypes.object,
  handleSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    postLogin: evt => {
      dispatch(postLogin(evt));
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
)(LoginPage);
