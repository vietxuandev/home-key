/**
 *
 * ProfilePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import TocIcon from '@material-ui/icons/Toc';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getProfile, getJobs, deleteJob } from './actions';
import Money from '../../helper/format';
import { Button, IconButton, Paper } from '@material-ui/core';
import { changeAppStoreData } from '../App/actions';

export function ProfilePage(props) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });
  const history = useHistory();
  const {
    jobs = [],
    profile: { firstName = '', lastName = '', phoneNumber = {}, wallet = '' },
  } = props.profilePage;
  const handleDelete = id => {
    props.changeAppStoreData('alert', {
      title: 'Hủy đặt cọc',
      content: 'Bạn sẽ mất tiền cọc khi hủy! Bạn thực sự muốn xóa?',
      callBack: () => {
        props.deleteJob(id);
      },
    });
    props.changeAppStoreData('showAlert', true);
  };
  useEffect(() => {
    props.getProfile();
    props.getJobs();
  }, []);
  return (
    <div>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <Grid container>
        <Grid item xs={12}>
          Họ tên: {lastName} {firstName}
        </Grid>
        <Grid item xs={12}>
          Số điện thoại: {phoneNumber.countryCode}
          {phoneNumber.number}
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              Ví nội bộ: {Money(wallet)}
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={() => {
                  history.push('/recharge');
                }}
              >
                Nạp tiền vào ví
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        {jobs.map(job => (
          <Grid item xs={12} key={job._id}>
            <Paper elevation={4} style={{ padding: 10, marginTop: '30px' }}>
              <Grid container>
                <Grid item xs={6}>
                  <div>{job.fullName}</div>
                  <div>{job.phoneNumber}</div>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={6}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          handleDelete(job._id);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <div>Hủy cọc</div>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          history.push(`/job-detail/${job._id}`);
                        }}
                      >
                        <TocIcon />
                      </IconButton>
                      <div>Chi tiết</div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

ProfilePage.propTypes = {
  profilePage: PropTypes.object,
  getProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProfile: () => {
      dispatch(getProfile());
    },
    getJobs: () => {
      dispatch(getJobs());
    },
    deleteJob: id => {
      dispatch(deleteJob(id));
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
)(ProfilePage);
