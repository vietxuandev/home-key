/**
 *
 * SignUpPage
 *
 */

import React, { memo, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link as LinkDom } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSignUpPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { postSignUp, changeStoreData } from './actions';
import Otp from 'containers/Otp/Loadable';

const REGEX_PASSWORD = /\S.*\S/;
const validateForm = Yup.object().shape({
  firstName: Yup.string().required('Vui lòng nhập tên'),
  lastName: Yup.string().required('Vui lòng nhập họ'),
  phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
  password: Yup.string()
    .min(6, 'Mật khẩu không hợp lệ, mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu')
    .matches(REGEX_PASSWORD, 'Mật khẩu không hợp lệ'),
  confirmPassword: Yup.string()
    .min(6, 'Mật khẩu không hợp lệ, mật khẩu phải có ít nhất 6 ký tự')
    .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
    .required('Vui lòng nhập lại mật khẩu')
    .matches(REGEX_PASSWORD, 'Mật khẩu không hợp lệ'),
});

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignUpPage(props) {
  useInjectReducer({ key: 'signUpPage', reducer });
  useInjectSaga({ key: 'signUpPage', saga });
  const classes = useStyles();
  const [role, setRole] = useState('customer');
  const {
    open = false,
    signUpErrors = [],
    currentUser = {},
  } = props.signUpPage;
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const setOpen = value => {
    props.changeStoreData('open', value);
  };
  return (
    <Fragment>
      <Helmet>
        <title>SignUpPage</title>
        <meta name="description" content="Description of SignUpPage" />
      </Helmet>
      <Typography component="h1" variant="h5">
        Đăng ký
      </Typography>
      {signUpErrors.length > 0 && (
        <Alert severity="error">
          {signUpErrors.map(error => error.errorMessage)}
        </Alert>
      )}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          role,
          showPassword: false,
          showConfirmPassword: false,
        }}
        enableReinitialize
        onSubmit={env => {
          props.postSignUp(env);
        }}
        validationSchema={validateForm}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field name="firstName">
                  {({ field }) => (
                    <TextField
                      label="Tên"
                      variant="outlined"
                      required
                      helperText={touched.firstName && errors.firstName}
                      fullWidth
                      size="small"
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="lastName">
                  {({ field }) => (
                    <TextField
                      label="Họ và tên đệm"
                      variant="outlined"
                      required
                      helperText={touched.lastName && errors.lastName}
                      fullWidth
                      size="small"
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="phoneNumber">
                  {({ field }) => (
                    <TextField
                      label="Số điện thoại"
                      variant="outlined"
                      required
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      fullWidth
                      size="small"
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="password">
                  {({ field }) => (
                    <TextField
                      label="Mật khẩu"
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
                                setFieldValue(
                                  'showPassword',
                                  !values.showPassword,
                                )
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
              </Grid>
              <Grid item xs={12}>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <TextField
                      label="Nhập lại mật khẩu"
                      variant="outlined"
                      required
                      type={values.showConfirmPassword ? 'text' : 'password'}
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      fullWidth
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setFieldValue(
                                  'showConfirmPassword',
                                  !values.showConfirmPassword,
                                )
                              }
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showConfirmPassword ? (
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
              </Grid>
            </Grid>
            <Button
              className={classes.submit}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={
                !values.phoneNumber || !values.password || !_.isEmpty(errors)
              }
            >
              Đăng ký
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={LinkDom} to="/auth/login">
                  Bạn đã có tài khoản? Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Otp open={open} setOpen={setOpen} />
    </Fragment>
  );
}

SignUpPage.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  signUpPage: makeSelectSignUpPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    postSignUp: evt => {
      dispatch(postSignUp(evt));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
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
)(SignUpPage);
