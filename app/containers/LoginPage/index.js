/**
 *
 * LoginPage
 *
 */

import React, { memo, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
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

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const { loginErrors = [] } = props.loginPage;
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
      <Grid container justify="center" alignContent="center">
        <Grid item xs={6} md={4}>
          <Paper
            elevation={4}
            style={{ padding: '20px 15px', marginTop: '30px' }}
          >
            <Typography variant="h6" gutterBottom>
              Login
            </Typography>
            {loginErrors.length > 0 && (
              <Alert severity="error">
                {loginErrors.map(error => error.errorMessage)}
              </Alert>
            )}
            <Formik
              initialValues={{ phoneNumber: '', password: '' }}
              onSubmit={env => props.postLogin(env)}
              validationSchema={Yup.object().shape({
                phoneNumber: Yup.string().required('Required'),
                password: Yup.string().required('Required'),
              })}
            >
              {({ values, touched, errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Phone number</InputLabel>
                    <Field name="phoneNumber">
                      {({ field }) => <Input fullWidth {...field} />}
                    </Field>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <FormHelperText>{errors.phoneNumber}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Password</InputLabel>
                    <Field name="password">
                      {({ field }) => (
                        <Input fullWidth type="password" {...field} />
                      )}
                    </Field>
                    {touched.password && errors.password && (
                      <FormHelperText>{errors.password}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={
                        !values.phoneNumber ||
                        !values.password ||
                        !_.isEmpty(errors)
                      }
                    >
                      Login
                    </Button>
                  </FormControl>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
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
