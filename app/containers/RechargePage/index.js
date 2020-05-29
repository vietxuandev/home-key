/**
 *
 * RechargePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRechargePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { TextField, InputAdornment, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import { postRecharge } from './actions';
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

const validateForm = Yup.object().shape({
  amount: Yup.string().required('Vui lòng nhập số tiền cần nạp'),
});

export function RechargePage(props) {
  useInjectReducer({ key: 'rechargePage', reducer });
  useInjectSaga({ key: 'rechargePage', saga });
  const classes = useStyles();
  // useEffect(() => {
  //   props.postRecharge(1000000);
  // }, []);
  return (
    <div>
      <Helmet>
        <title>RechargePage</title>
        <meta name="description" content="Description of RechargePage" />
      </Helmet>
      <Formik
        initialValues={{
          amount: '',
        }}
        enableReinitialize
        onSubmit={env => {
          props.postRecharge(env.amount);
        }}
        validationSchema={validateForm}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field name="amount">
                  {({ field }) => (
                    <TextField
                      label="Số tiền"
                      variant="outlined"
                      required
                      helperText={touched.amount && errors.amount}
                      fullWidth
                      size="small"
                      error={!!(touched.amount && errors.amount)}
                      {...field}
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                        endAdornment: (
                          <InputAdornment position="end">NVĐ</InputAdornment>
                        ),
                      }}
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
              disabled={!values.amount || !_.isEmpty(errors)}
            >
              Nạp tiền
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

RechargePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  rechargePage: makeSelectRechargePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    postRecharge: amount => {
      dispatch(postRecharge(amount));
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
)(RechargePage);
