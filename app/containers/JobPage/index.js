/**
 *
 * JobPage
 *
 */
import 'date-fns';
import React, { memo, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import localStore from 'local-storage';
import _ from 'lodash';
import makeSelectJobPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getRoom } from '../RoomPage/actions';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

const validateForm = Yup.object().shape({
  checkInTime: Yup.string().required('Vui lòng chọn ngày nhận phòng'),
  fullName: Yup.string().required('Vui lòng nhập tên người đặt phòng'),
  phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
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

export function JobPage(props) {
  useInjectReducer({ key: 'jobPage', reducer });
  useInjectSaga({ key: 'jobPage', saga });
  const { id } = useParams();
  const { room } = props.jobPage;
  const {
    price,
    depositPrice: deposit,
    electricityPrice,
    waterPrice,
    availableDate,
  } = room;
  const user = localStore.get('user') || {};
  const classes = useStyles();
  useEffect(() => {
    props.getRoom(id);
  }, []);
  return (
    <div style={{ marginTop: 20 }}>
      <Helmet>
        <title>JobPage</title>
        <meta name="description" content="Description of JobPage" />
      </Helmet>
      <Formik
        initialValues={{
          roomId: '',
          checkInTime: new Date(),
          fullName: !_.isEmpty(user)
            ? `${user.lastName} ${user.firstName}`
            : '',
          phoneNumber: !_.isEmpty(user)
            ? `${user.phoneNumber.countryCode}${user.phoneNumber.number}`
            : '',
          price,
          bail: price / 2,
          total: '',
          deposit,
          afterCheckInCost: price / 2 + deposit,
          rentalPeriod: 3,
        }}
        enableReinitialize
        onSubmit={() => {}}
        validationSchema={validateForm}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    inputVariant="outlined"
                    required
                    id="date-picker-dialog"
                    label="Ngày nhận phòng"
                    format="dd/MM/yyyy"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    value={values.checkInTime}
                    onChange={date => {
                      setFieldValue('checkInTime', date);
                    }}
                    size="small"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <Field name="fullName">
                  {({ field }) => (
                    <TextField
                      label="Người đặt phòng"
                      variant="outlined"
                      required
                      helperText={touched.fullName && errors.fullName}
                      fullWidth
                      size="small"
                      error={!!(touched.fullName && errors.fullName)}
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
                      error={!!(touched.phoneNumber && errors.phoneNumber)}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Giá thuê 1 tháng"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={values.price}
                  InputProps={{
                    readOnly: true,
                    inputComponent: NumberFormatCustom,
                    endAdornment: (
                      <InputAdornment position="end">NVĐ</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tiền thế chân"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={values.deposit}
                  InputProps={{
                    readOnly: true,
                    inputComponent: NumberFormatCustom,
                    endAdornment: (
                      <InputAdornment position="end">NVĐ</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tiền đặt cọc"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={values.bail}
                  InputProps={{
                    readOnly: true,
                    inputComponent: NumberFormatCustom,
                    endAdornment: (
                      <InputAdornment position="end">NVĐ</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Thanh toán khi nhận phòng"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={values.afterCheckInCost}
                  InputProps={{
                    readOnly: true,
                    inputComponent: NumberFormatCustom,
                    endAdornment: (
                      <InputAdornment position="end">NVĐ</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Field name="rentalPeriod">
                  {({ field }) => (
                    <TextField
                      required
                      label="Hợp đồng thuê"
                      variant="outlined"
                      helperText={touched.rentalPeriod && errors.rentalPeriod}
                      fullWidth
                      size="small"
                      type="number"
                      error={!!(touched.rentalPeriod && errors.rentalPeriod)}
                      {...field}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Tháng</InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Trống từ"
                  variant="outlined"
                  fullWidth
                  value={moment(availableDate).format('DD/MM/YYYY')}
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Giá điện"
                  variant="outlined"
                  fullWidth
                  value={electricityPrice}
                  size="small"
                  InputProps={{
                    readOnly: true,
                    inputComponent: NumberFormatCustom,
                    endAdornment: (
                      <InputAdornment position="end">NVĐ</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Giá nước"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={waterPrice}
                  InputProps={{
                    readOnly: true,
                    inputComponent: NumberFormatCustom,
                    endAdornment: (
                      <InputAdornment position="end">NVĐ</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tiền đặt cọc"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputProps={{
                    readOnly: true,
                    inputComponent: NumberFormatCustom,
                    endAdornment: (
                      <InputAdornment position="end">NVĐ</InputAdornment>
                    ),
                  }}
                  value={values.bail}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

JobPage.propTypes = {
  getRoom: PropTypes.func,
  jobPage: PropTypes.object,
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  jobPage: makeSelectJobPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRoom: id => {
      dispatch(getRoom(id));
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
)(JobPage);
