/**
 *
 * Payment
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPayment from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Container, Grid, Typography, Button, Avatar } from '@material-ui/core';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import { putPay, changeStoreData } from './actions';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Money from '../../helper/format';
import { changeAppStoreData } from '../App/actions';
import ErrorDialog from '../../components/ErrorDialog/Loadable';
import { getJob } from '../JobDetail/actions';

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

const PaymentStatus = props => {
  const classes = useStyles();
  const { status = {}, paymentError = '' } = props;
  const { amount = '', description = '', job = '', type = '' } = status;
  const handleNextPage = () => {
    type === 'deposit'
      ? history.push(`/job-verify/${job}`)
      : history.push(`/job-detail/${job}`);
  };
  const history = useHistory();
  return (
    <PaperWrapper style={{ textAlign: 'center' }}>
      {paymentError.length > 0 ? (
        <div style={{ marginTop: '10px' }}>
          <Avatar className={classes.red}>
            <CloseIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Thanh toán không thành công
          </Typography>
          {paymentError.map(error => (
            <Typography>Nội dung: {error.errorMessage}</Typography>
          ))}
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
        </div>
      ) : (
        <div>
          <Avatar className={classes.green}>
            <DoneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Thanh toán thành công
          </Typography>
          <Typography>
            Số tiền:{' '}
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              {Money(amount)}
            </span>
          </Typography>
          <Typography>
            Nội dung: <span style={{ fontWeight: 'bold' }}>{description}</span>
          </Typography>
          <Button
            className={classes.button}
            onClick={handleNextPage}
            fullWidth
            variant="contained"
            color="primary"
          >
            {type === 'deposit' ? 'Tiếp tục' : 'Hoàn thành'}
          </Button>
        </div>
      )}
    </PaperWrapper>
  );
};

const PaymentType = props => {
  const {
    currentOrder = {},
    handleOpen = () => {},
    handlePayment = () => {},
  } = props;
  const { amount = '', description = '' } = currentOrder;
  return (
    <PaperWrapper>
      <Typography component="h1" variant="h5">
        Chọn hình thức thanh toán
      </Typography>
      <Container
        maxWidth="sm"
        style={{ marginTop: '10px', textAlign: 'center' }}
      >
        <Typography component="h2" variant="h6">
          Thông tin thanh toán
        </Typography>
        <Typography>
          Số tiền:{' '}
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {Money(amount)}
          </span>
        </Typography>
        <Typography>
          Nội dung: <span style={{ fontWeight: 'bold' }}>{description}</span>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              startIcon={<CreditCardIcon fontSize="large" color="primary" />}
              onClick={handleOpen}
            >
              <span style={{ color: 'red', fontWeight: 'bold' }}>VN</span>
              <span style={{ color: 'blue', fontWeight: 'bold' }}>PAY</span>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              startIcon={
                <AccountBalanceWalletIcon fontSize="large" color="primary" />
              }
              onClick={handlePayment}
            >
              Ví nội bộ
            </Button>
          </Grid>
        </Grid>
      </Container>
    </PaperWrapper>
  );
};

export function Payment(props) {
  useInjectReducer({ key: 'payment', reducer });
  useInjectSaga({ key: 'payment', saga });
  const { id } = useParams();
  const { job = {}, status = {}, paymentError = '' } = props.payment;
  const { currentOrder = {} } = job;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handlePayment = () => {
    props.changeAppStoreData('alert', {
      title: 'Thanh toán',
      content: 'Số tiền sẽ trừ vào ví của bạn, bạn thực sự muốn thanh toán?',
      callBack: () => {
        props.putPay(currentOrder._id);
      },
    });
    props.changeAppStoreData('showAlert', true);
  };
  const handleCleanData = () => {
    props.changeStoreData('status', {});
    props.changeStoreData('paymentError', []);
  };
  useEffect(() => {
    props.getJob(id);
    return handleCleanData;
  }, []);

  return (
    <div>
      <Helmet>
        <title>Payment</title>
        <meta name="description" content="Description of Payment" />
      </Helmet>
      <Container maxWidth="md">
        {!_.isEmpty(status) || paymentError.length ? (
          <PaymentStatus status={status} paymentError={paymentError} />
        ) : (
          <PaymentType
            handleOpen={handleOpen}
            handlePayment={handlePayment}
            currentOrder={currentOrder}
          />
        )}
      </Container>
      <ErrorDialog
        open={open}
        error={{ title: 'Thông báo', content: 'Tính năng chưa được hỗ trợ' }}
        handleClose={handleClose}
      />
    </div>
  );
}

Payment.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  payment: makeSelectPayment(),
});

function mapDispatchToProps(dispatch) {
  return {
    putPay: id => {
      dispatch(putPay(id));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    changeAppStoreData: (key, value) => {
      dispatch(changeAppStoreData(key, value));
    },
    getJob: id => {
      dispatch(getJob(id));
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
)(Payment);
