/**
 *
 * PaymentReturn
 *
 */

import React, { memo, useEffect } from 'react';
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
import PaperWrapper from '../../components/PaperWrapper/Loadable';

const useStyles = makeStyles(theme => ({
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

  return (
    <div>
      <Helmet>
        <title>PaymentReturn</title>
        <meta name="description" content="Description of PaymentReturn" />
      </Helmet>
      <Container maxWidth="sm" style={{ paddingTop: '20px' }}>
        <PaperWrapper style={{ textAlign: 'center' }}>
          {data.RspCode === '00' ? (
            <div>
              <Avatar className={classes.green}>
                <DoneIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Thanh toán thành công
              </Typography>
              <Typography>+{Money(amount / 100)}</Typography>
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
          <Typography>Mã giao dịch: {paymentId}</Typography>
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
        </PaperWrapper>
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
