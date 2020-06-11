/**
 *
 * JobPage
 *
 */
import 'date-fns';
import React, { memo, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

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
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import { Container, Typography, Button } from '@material-ui/core';
import { postJob, changeStoreData } from './actions';
import { changeAppStoreData } from '../App/actions';
import ErrorDialog from '../../components/ErrorDialog';

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
  const [editName, setEditName] = useState(true);
  const [editPhone, setEditPhone] = useState(true);
  const { id } = useParams();
  const { room, jobError = {}, showError = false } = props.jobPage;
  const { errorMessage = '' } = jobError;
  const {
    price = 0,
    depositPrice = 0,
    electricityPrice = 0,
    waterPrice = 0,
    availableDate = moment(),
    minimumMonths = 0,
  } = room;
  const user = localStore.get('user') || {};
  const classes = useStyles();
  const handleMouseDown = event => {
    event.preventDefault();
  };
  useEffect(() => {
    props.getRoom(id);
    return () => {
      props.changeStoreData('jobErrors', []);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>JobPage</title>
        <meta name="description" content="Description of JobPage" />
      </Helmet>
      <Container maxWidth="md">
        <PaperWrapper>
          <Typography component="h1" variant="h5">
            Thông tin đặt cọc
          </Typography>
          <Formik
            initialValues={{
              roomId: id,
              checkInTime: moment(),
              fullName: !_.isEmpty(user)
                ? `${user.lastName} ${user.firstName}`
                : '',
              phoneNumber: !_.isEmpty(user)
                ? `${user.phoneNumber.countryCode}${user.phoneNumber.number}`
                : '',
              price,
              bail: depositPrice,
              total: price + depositPrice,
              deposit: price / 2,
              afterCheckInCost: price / 2 + depositPrice,
              rentalPeriod: minimumMonths,
            }}
            enableReinitialize
            onSubmit={env => {
              let formData = new FormData();
              Object.keys(env).map(key => {
                if (key === 'checkInTime') {
                  formData.append(key, moment(env[key]).format('MM/DD/YYYY'));
                } else {
                  formData.append(key, env[key]);
                }
              });
              props.postJob(formData);
            }}
            validationSchema={Yup.object().shape({
              checkInTime: Yup.date()
                .max(
                  moment().add(7, 'days'),
                  `Ngày nhận phòng phải nhỏ hơn ngày ${moment()
                    .add(7, 'days')
                    .format('DD/MM/YYYY')}`,
                )
                .typeError('Ngày nhận phòng không hợp lệ')
                .required('Vui lòng chọn ngày nhận phòng')
                .nullable(),
              fullName: Yup.string().required(
                'Vui lòng nhập tên người đặt phòng',
              ),
              phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
              rentalPeriod: Yup.number()
                .required('Vui lòng nhập số tháng thuê')
                .min(
                  minimumMonths,
                  `Số tháng thuê phải lớn hơn hoặc bằng ${minimumMonths} tháng`,
                )
                .integer(),
            })}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              setFieldValue,
              isValid,
            }) => (
              <Form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        fullWidth
                        inputVariant="outlined"
                        required
                        disablePast
                        maxDate={moment().add(7, 'days')}
                        minDate={moment()}
                        id="date-picker-dialog"
                        label="Ngày nhận phòng"
                        format="dd/MM/yyyy"
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        helperText={errors.checkInTime}
                        error={Boolean(errors.checkInTime)}
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
                          error={Boolean(touched.fullName && errors.fullName)}
                          {...field}
                          InputProps={{
                            readOnly: editName,
                            endAdornment: editName && (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle edit"
                                  onClick={() => {
                                    setEditName(false);
                                  }}
                                  onMouseDown={handleMouseDown}
                                  edge="end"
                                >
                                  <EditIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
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
                          error={Boolean(
                            touched.phoneNumber && errors.phoneNumber,
                          )}
                          {...field}
                          InputProps={{
                            readOnly: editPhone,
                            endAdornment: editPhone && (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle edit"
                                  onClick={() => {
                                    setEditPhone(false);
                                  }}
                                  onMouseDown={handleMouseDown}
                                  edge="end"
                                >
                                  <EditIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
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
                      label="Tiền đặt cọc"
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
                          helperText={
                            touched.rentalPeriod && errors.rentalPeriod
                          }
                          fullWidth
                          size="small"
                          type="number"
                          error={Boolean(
                            touched.rentalPeriod && errors.rentalPeriod,
                          )}
                          {...field}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                Tháng
                              </InputAdornment>
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
                      name="total"
                      value={values.deposit}
                    />
                  </Grid>
                </Grid>
                <Button
                  className={classes.submit}
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isValid}
                >
                  Đặt cọc
                </Button>
              </Form>
            )}
          </Formik>
        </PaperWrapper>
      </Container>
      <ErrorDialog
        open={showError}
        error={{ title: 'Lỗi', content: errorMessage }}
        handleClose={() => props.changeStoreData('showError', false)}
      />
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
    postJob: formData => {
      dispatch(postJob(formData));
    },
    changeAppStoreData: (key, value) => {
      dispatch(changeAppStoreData(key, value));
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
)(JobPage);
