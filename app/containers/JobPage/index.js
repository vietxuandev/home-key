/**
 *
 * JobPage
 *
 */
import 'date-fns';
import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJobPage from './selectors';
import reducer from './reducer';
import saga from './saga';

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
      // prefix="VND "
    />
  );
}

const validateForm = Yup.object().shape({
  checkInTime: Yup.string().required('Vui lòng chọn ngày nhận phòng'),
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

export function JobPage() {
  useInjectReducer({ key: 'jobPage', reducer });
  useInjectSaga({ key: 'jobPage', saga });
  const [selectedDate, setSelectedDate] = React.useState(null);
  const classes = useStyles();
  const handleDateChange = date => {
    setSelectedDate(date);
  };
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
          fullName: '',
          price: '',
          bail: '',
          total: '',
          deposit: '',
          afterCheckInCost: '',
          rentalPeriod: '',
        }}
        enableReinitialize
        onSubmit={() => {}}
        validationSchema={validateForm}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Field name="checkInTime">
                {({ field }) => (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      inputVariant="outlined"
                      required
                      id="date-picker-dialog"
                      label="Ngày nận phòng"
                      format="dd/MM/yyyy"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      size="small"
                      error={touched.checkInTime && errors.checkInTime}
                      helperText={touched.checkInTime && errors.checkInTime}
                      {...field}
                    />
                  </MuiPickersUtilsProvider>
                )}
              </Field>
              <TextField
                label="Người đặt phòng"
                variant="outlined"
                required
                // helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
                size="small"
                // error={!!(touched.phoneNumber && errors.phoneNumber)}
                // {...field}
              />
              <TextField
                label="Số điện thoại"
                variant="outlined"
                required
                // helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
                size="small"
                // error={!!(touched.phoneNumber && errors.phoneNumber)}
                // {...field}
              />
              <TextField
                label="Giá thuê 1 tháng"
                variant="outlined"
                // helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
                size="small"
                // error={!!(touched.phoneNumber && errors.phoneNumber)}
                // {...field}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <TextField
                label="Tiền thế chân"
                variant="outlined"
                // helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
                size="small"
                // error={!!(touched.phoneNumber && errors.phoneNumber)}
                // {...field}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <TextField
                label="Thanh toán khi nhận phòng"
                variant="outlined"
                // helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
                size="small"
                // error={!!(touched.phoneNumber && errors.phoneNumber)}
                // {...field}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <TextField
                label="Hợp đồng thuê"
                variant="outlined"
                // helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
                size="small"
                // error={!!(touched.phoneNumber && errors.phoneNumber)}
                // {...field}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  inputVariant="outlined"
                  required
                  size="small"
                  id="date-picker-dialog"
                  label="Trống từ"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <TextField
                label="Giá điện"
                variant="outlined"
                // helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
                size="small"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <TextField
                label="Giá nước"
                variant="outlined"
                // helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
                size="small"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <TextField
                label="Tiền đặt cọc"
                variant="outlined"
                // helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
                size="small"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

JobPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  jobPage: makeSelectJobPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
