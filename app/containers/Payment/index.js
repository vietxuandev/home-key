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
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPayment from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
} from '@material-ui/core';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import { putPay, changeStoreData } from './actions';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Money from '../../helper/format';
import { changeAppStoreData } from '../App/actions';

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
  const { status, paymentError, id = '' } = props;
  const { amount = 0, description = '' } = status;
  const history = useHistory();
  return (
    <PaperWrapper style={{ textAlign: 'center' }}>
      {paymentError.length > 0 ? (
        <div>
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
          <Typography>Số tiền: {Money(amount)}</Typography>
          <Typography>Nội dung: {description}</Typography>
          <Button
            className={classes.button}
            onClick={() => {
              history.push(`/job-verify/${id}`);
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            Tiếp tục
          </Button>
        </div>
      )}
    </PaperWrapper>
  );
};

const PaymentType = props => {
  return (
    <PaperWrapper>
      <Typography component="h1" variant="h5">
        Chọn hình thức thanh toán
      </Typography>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              startIcon={<CreditCardIcon fontSize="large" color="primary" />}
              onClick={props.handleOpen}
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
              onClick={props.handlePayment}
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
  const { status, paymentError } = props.payment;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handlePayment = () => {
    props.changeAppStoreData('alert', {
      title: 'Đặt cọc',
      content:
        'Tiền cọc sẽ trừ vào tài khoản của bạn? Bạn thực sự muốn đặt cọc?',
      callBack: () => {
        props.putPay(id);
      },
    });
    props.changeAppStoreData('showAlert', true);
  };
  const handleCleanData = () => {
    props.changeStoreData('status', null);
    props.changeStoreData('paymentError', []);
  };
  useEffect(() => {
    return handleCleanData;
  }, []);

  return (
    <div>
      <Helmet>
        <title>Payment</title>
        <meta name="description" content="Description of Payment" />
      </Helmet>
      <Container maxWidth="md">
        {status || paymentError.length > 0 ? (
          <PaymentStatus id={id} status={status} paymentError={paymentError} />
        ) : (
          <PaymentType handleOpen={handleOpen} handlePayment={handlePayment} />
        )}
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tính năng chưa được hỗ trợ
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
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
