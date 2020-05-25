/**
 *
 * LoginPage
 *
 */

import React, { memo, Fragment } from 'react';
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
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { postLogin } from './actions';

import './style.scss';

const validateForm = Yup.object().shape({
  phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
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

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const { loginErrors = [] } = props.loginPage;
  const classes = useStyles();
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <Fragment>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Typography component="h1" variant="h5">
        Đăng nhập
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
        validationSchema={validateForm}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
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
              Đăng nhập
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={LinkDom} to="/auth/sign-up">
                  Bạn chưa có tài khoản? Đăng ký
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Fragment>
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
