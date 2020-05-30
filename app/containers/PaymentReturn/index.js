/**
 *
 * PaymentReturn
 *
 */

import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPaymentReturn from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getCallBack } from './actions';
import Bacground from '../../images/background.jpg';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Money from '../../helper/format';

const useStyles = makeStyles(theme => ({
  root: {
    background: `url(${Bacground}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
    margin: 'auto',
  },
  red: {
    color: '#fff',
    backgroundColor: red[500],
    margin: 'auto',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  center: {
    margin: 'auto',
  },
}));

export function PaymentReturn(props) {
  useInjectReducer({ key: 'paymentReturn', reducer });
  useInjectSaga({ key: 'paymentReturn', saga });
  const classes = useStyles();
  const { search: queryString = '' } = props.location;
  const urlParams = new URLSearchParams(queryString);
  const amount = urlParams.get('vnp_Amount') || '';
  const paymentId = urlParams.get('vnp_TxnRef') || '';
  const { data } = props.paymentReturn;
  const history = useHistory();
  useEffect(() => {
    props.getCallBack(queryString);
  }, []);
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
        <title>PaymentReturn</title>
        <meta name="description" content="Description of PaymentReturn" />
      </Helmet>
      <Container maxWidth="sm" style={{ paddingTop: '20px' }}>
        <Paper elevation={3} className={classes.paper}>
          {data.RspCode === '00' ? (
            <div>
              <Avatar className={classes.green}>
                <DoneIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Thanh toán thành công
              </Typography>
              <Typography>+{Money(amount / 100)}</Typography>
              <Typography>Mã giao dịch: {paymentId}</Typography>
            </div>
          ) : (
            <div>
              <Avatar className={classes.red}>
                <CloseIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Thanh toán không thành công
              </Typography>
            </div>
          )}
          <Button
            className={classes.button}
            onClick={() => {
              history.push('/');
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            Về trang chủ
          </Button>
        </Paper>
      </Container>
    </div>
  );
}

PaymentReturn.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  paymentReturn: makeSelectPaymentReturn(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCallBack: queryString => {
      dispatch(getCallBack(queryString));
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
)(PaymentReturn);
