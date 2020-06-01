/**
 *
 * RechargePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
import {
  TextField,
  InputAdornment,
  Button,
  Grid,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { postRecharge } from './actions';
import PaperWrapper from '../../components/PaperWrapper/Loadable';

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
  amount: Yup.string().required('Vui lòng nhập số tiền cần nạp'),
});

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: 10,
  },
  submit: {
    marginTop: 15,
  },
}));

export function RechargePage(props) {
  useInjectReducer({ key: 'rechargePage', reducer });
  useInjectSaga({ key: 'rechargePage', saga });
  const classes = useStyles();
  return (
    <div>
      <Helmet>
        <title>RechargePage</title>
        <meta name="description" content="Description of RechargePage" />
      </Helmet>
      <Container maxWidth="sm">
        <PaperWrapper>
          <Typography component="h1" variant="h5" className={classes.title}>
            Nạp tiền
          </Typography>
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
                  <Grid item xs={12}>
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
                              <InputAdornment position="end">
                                NVĐ
                              </InputAdornment>
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
        </PaperWrapper>
      </Container>
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
