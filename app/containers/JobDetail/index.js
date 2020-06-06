/**
 *
 * JobDetail
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJobDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import moment from 'moment';
import { getJob } from './actions';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import {
  Typography,
  Container,
  TextField,
  Grid,
  List,
  ListItem,
  Divider,
} from '@material-ui/core';
import Money from '../../helper/format';
import './style.scss';

export function JobDetail(props) {
  useInjectReducer({ key: 'jobDetail', reducer });
  useInjectSaga({ key: 'jobDetail', saga });
  const { id = '' } = useParams();
  const { job } = props.jobDetail;
  const {
    fullName = '',
    phoneNumber = '',
    motelRoom = {},
    checkInTime = new Date(),
    price = '',
    bail = '',
    afterCheckInCost = '',
    room = '',
    images = [],
    rentalPeriod = '',
  } = job;
  const { name } = motelRoom;
  const { roomPassword } = room;
  useEffect(() => {
    props.getJob(id);
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
          <Grid container justify="center" alignItems="center" spacing={2}>
            {images.map(image => (
              <Grid item xs={6}>
                <div className="image-wrapper">
                  <img src={image} alt="front identify" />
                </div>
              </Grid>
            ))}
          </Grid>
          <List>
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  Tên
                </Grid>
                <Grid item xs={9} style={{ textAlign: 'right' }}>
                  {fullName}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  SĐT
                </Grid>
                <Grid item xs={9} style={{ textAlign: 'right' }}>
                  {phoneNumber}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={3}>
                  Nhà trọ
                </Grid>
                <Grid item xs={9} style={{ textAlign: 'right' }}>
                  {name}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  Ngày nhận phòng
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  {moment(checkInTime).format('DD/MM/YYYY')}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  Giá phòng
                </Grid>
                <Grid item xs={8} style={{ textAlign: 'right' }}>
                  {Money(price)}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  Thanh toán khi nhận phòng
                </Grid>
                <Grid item xs={8} style={{ textAlign: 'right' }}>
                  {Money(afterCheckInCost)}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  Mã khóa phòng
                </Grid>
                <Grid item xs={8} style={{ textAlign: 'right' }}>
                  {roomPassword}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={4}>
                  Hợp đồng thuê
                </Grid>
                <Grid item xs={8} style={{ textAlign: 'right' }}>
                  {rentalPeriod}
                </Grid>
              </Grid>
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
