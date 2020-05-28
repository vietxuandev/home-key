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

export function JobPage() {
  useInjectReducer({ key: 'jobPage', reducer });
  useInjectSaga({ key: 'jobPage', saga });
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  return (
    <div style={{ marginTop: 20 }}>
      <Helmet>
        <title>JobPage</title>
        <meta name="description" content="Description of JobPage" />
      </Helmet>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          inputVariant="outlined"
          required
          size="small"
          id="date-picker-dialog"
          label="Ngày nận phòng"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
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
    </div>
  );
}

JobPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
