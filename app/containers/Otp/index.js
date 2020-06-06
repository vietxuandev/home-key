/**
 *
 * Otp
 *
 */

import React, { memo } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import localStore from 'local-storage';
import ReactCodeInput from 'react-code-input';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectOtp from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getResendOTP, postOTP, changeStoreData } from './actions';
import './style.scss';

const validateForm = Yup.object().shape({
  code: Yup.string()
    .min(6, 'Mã OTP không hợp lệ')
    .required('Vui lòng nhập mã OTP'),
});

export function Otp(props) {
  useInjectReducer({ key: 'otp', reducer });
  useInjectSaga({ key: 'otp', saga });
  const { otpErrors = [] } = props.otp;
  const { open = false, setOpen = () => {} } = props;
  const handleOTP = code => {
    props.postOTP(code);
  };
  const handleResendOTP = () => {
    props.getResendOTP();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const currentUser = localStore.get('user') || {};
  return (
    <Dialog
      className="otp-wrapper"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Formik
        initialValues={{
          code: '',
        }}
        enableReinitialize
        onSubmit={env => {
          handleOTP(env);
        }}
        validationSchema={validateForm}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <DialogTitle id="alert-dialog-title">OTP</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Mã xác thực đã được gởi đến{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {currentUser.phoneNumber.countryCode}
                  {currentUser.phoneNumber.number}
                </span>
              </DialogContentText>
              {otpErrors.length > 0 && (
                <Alert severity="error">
                  {otpErrors.map(error => error.errorMessage)}
                </Alert>
              )}
              <Grid container justify="center">
                <ReactCodeInput
                  name="code"
                  value={values.code}
                  autoFocus
                  fields={6}
                  touched={touched.code}
                  onChange={value => {
                    setFieldValue('code', value);
                  }}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleResendOTP} color="primary">
                Resend
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={Boolean(!values.code || errors.code)}
              >
                Send
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

Otp.propTypes = {
  otp: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  postOTP: PropTypes.func,
  getResendOTP: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  otp: makeSelectOtp(),
});

function mapDispatchToProps(dispatch) {
  return {
    postOTP: code => {
      dispatch(postOTP(code));
    },
    getResendOTP: () => {
      dispatch(getResendOTP());
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
)(Otp);
