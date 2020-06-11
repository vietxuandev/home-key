/**
 *
 * JobDetail
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TodayIcon from '@material-ui/icons/Today';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJobDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import moment from 'moment';
import { getJob, putActive, putCheckOut, changeStoreData } from './actions';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import {
  Typography,
  Container,
  Grid,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import Money from '../../helper/format';
import './style.scss';
import { getProfile } from '../ProfilePage/actions';
import { changeAppStoreData } from '../App/actions';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: '10px',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0, 0, 0, .25)',
    paddingBottom: '8px',
  },
  text: {
    display: 'flex',
  },
  label: {
    fontWeight: 'bold',
    paddingRight: '5px',
  },
  button: {
    marginLeft: '5px',
  },
}));

export function JobDetail(props) {
  useInjectReducer({ key: 'jobDetail', reducer });
  useInjectSaga({ key: 'jobDetail', saga });
  const classes = useStyles();
  const { id = '' } = useParams();
  const history = useHistory();
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const {
    job,
    profile: { wallet = '' },
  } = props.jobDetail;
  const {
    fullName = '',
    phoneNumber = '',
    motelRoom = {},
    checkInTime = new Date(),
    price = '',
    bail = '',
    afterCheckInCost = '',
    currentOrder = {},
    returnRoomDate = '',
    images = [],
    rentalPeriod = '',
    isActived = false,
    roomPassword = '',
    isUpdatedReturnRoomDate = false,
  } = job;

  const checkOutDate = new Date(checkInTime).setMonth(
    new Date(checkInTime).getMonth() + Number(rentalPeriod),
  );

  const minDate = new Date(checkInTime).setMonth(
    new Date(checkInTime).getMonth() + 1,
  );
  const dateStay = Math.ceil(Math.abs(lastDay - today) / (24 * 3600 * 1000));
  const { name } = motelRoom;
  const handleCheckOut = date => {
    if (date < checkOutDate) {
      props.changeAppStoreData('showAlert', true);
      props.changeAppStoreData('alert', {
        title: 'Trả phòng',
        content: `Ngày trả phòng sớn hơn so với hợp đồng, bạn sẽ mất cọc khi trả phòng. Bạn thực sự muốn chọn ngày ${moment(
          date,
        ).format('DD/MM/YYYY')} để trả phòng?`,
        callBack: () => {
          props.putCheckOut(id, moment(date).format('MM/DD/YYYY'));
        },
      });
    } else {
      props.changeAppStoreData('showAlert', true);
      props.changeAppStoreData('alert', {
        title: 'Trả phòng',
        content: `Bạn thực sự muốn chọn ngày ${moment(date).format(
          'DD/MM/YYYY',
        )} để trả phòng?`,
        callBack: () => {
          props.putCheckOut(id, moment(date).format('MM/DD/YYYY'));
        },
      });
    }
  };
  useEffect(() => {
    props.getJob(id);
    props.getProfile();
  }, []);
  return (
    <div className="job-detail-wapper">
      <Helmet>
        <title>JobDetail</title>
        <meta name="description" content="Description of JobDetail" />
      </Helmet>
      <Container maxWidth="md">
        <PaperWrapper>
          <Typography component="h1" variant="h5">
            Thông tin thuê phòng
          </Typography>
          <Grid container justify="center" alignItems="center" spacing={1}>
            {images.map((image, index) => (
              <Grid item xs={6} key={index}>
                <div className="image-wrapper">
                  <img src={image} alt="front identify" />
                </div>
              </Grid>
            ))}
          </Grid>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Người thuê phòng" secondary={fullName} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="SĐT" secondary={phoneNumber} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HomeWorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nhà trọ" secondary={name} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MeetingRoomIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Phòng" secondary={name} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EventAvailableIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Ngày nhận phòng"
                secondary={moment(checkInTime).format('DD/MM/YYYY')}
              />
              <Button
                className={classes.button}
                size="small"
                variant="contained"
                color="primary"
                disabled={moment(checkInTime) > moment(new Date()) || isActived}
                onClick={() => {
                  props.putActive(id);
                }}
              >
                {isActived ? 'Đã kích hoạt' : 'Kích hoạt'}
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Giá phòng" secondary={Money(price)} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Tiền thế chân" secondary={Money(bail)} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Thanh toán khi nhận phòng"
                secondary={Money(afterCheckInCost)}
              />
              <Button
                className={classes.button}
                size="small"
                variant="contained"
                color="primary"
                disabled={
                  !isActived || currentOrder.type !== 'afterCheckInCost'
                }
                onClick={() => {
                  history.push(`/payment/${id}`);
                }}
              >
                {!isActived || currentOrder.type !== 'afterCheckInCost'
                  ? 'Đã thanh toán'
                  : 'Thanh toán'}
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <VpnKeyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Mã khóa phòng" secondary={roomPassword} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Hợp đồng thuê"
                secondary={`${rentalPeriod} tháng`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <TodayIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Ngày trả phòng"
                secondary={moment(
                  returnRoomDate ? returnRoomDate : checkOutDate,
                ).format('DD/MM/YYYY')}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="date-custom"
                  required
                  disablePast
                  // maxDate={moment().add(7, 'days')}
                  minDate={minDate}
                  id="date-picker-dialog"
                  placeholder="Nhập ngày"
                  format="dd/MM/yyyy"
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  disabled={isUpdatedReturnRoomDate}
                  value={returnRoomDate ? returnRoomDate : checkOutDate}
                  onChange={handleCheckOut}
                  size="small"
                />
              </MuiPickersUtilsProvider>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DateRangeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Số ngày ở" secondary={dateStay} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <InsertInvitationIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Hạn thanh toán"
                secondary={moment(lastDay).format('DD/MM/YYYY')}
              />
              <Button
                className={classes.button}
                size="small"
                variant="contained"
                color="primary"
                disabled={
                  !isActived ||
                  currentOrder.type !== 'monthly' ||
                  currentOrder.isCompleted
                }
                onClick={() => {
                  history.push(`/payment/${id}`);
                }}
              >
                {!isActived ||
                currentOrder.type !== 'monthly' ||
                currentOrder.isCompleted
                  ? 'Đã thanh toán'
                  : 'Thanh toán'}
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountBalanceWalletIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Số dư ví" secondary={Money(wallet)} />
            </ListItem>
          </List>
        </PaperWrapper>
      </Container>
    </div>
  );
}

JobDetail.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  jobDetail: makeSelectJobDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJob: id => {
      dispatch(getJob(id));
    },
    getProfile: () => {
      dispatch(getProfile());
    },
    putActive: id => {
      dispatch(putActive(id));
    },
    putCheckOut: (id, returnRoomDate) => {
      dispatch(putCheckOut(id, returnRoomDate));
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
)(JobDetail);
