/**
 *
 * RechargePage
 *
 */

import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
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
import Bacground from '../../images/background.jpg';

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
  root: {
    background: `url(${Bacground}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  },
  title: {
    marginBottom: 10,
  },
  profile: {
    padding: theme.spacing(2),
  },
  submit: {
    marginTop: 15,
  },
}));

export function RechargePage(props) {
  useInjectReducer({ key: 'rechargePage', reducer });
  useInjectSaga({ key: 'rechargePage', saga });
  const classes = useStyles();
  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      const updateSize = () => {
        setSize([window.innerWidth, window.innerHeight]);
      };
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  };
  const [width, height] = useWindowSize();
  return (
    <div
      className={classes.root}
      style={{ height: width < 600 ? height - 56 : height - 64 }}
    >
      <Helmet>
        <title>RechargePage</title>
        <meta name="description" content="Description of RechargePage" />
      </Helmet>
      <Container style={{ paddingTop: '20px' }}>
        <Paper elevation={3} className={classes.profile}>
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
        </Paper>
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
