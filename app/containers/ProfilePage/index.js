/**
 *
 * ProfilePage
 *
 */

import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import TocIcon from '@material-ui/icons/Toc';
import Grid from '@material-ui/core/Grid';
import RoomIcon from '@material-ui/icons/Room';
import AddIcon from '@material-ui/icons/Add';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PhoneIcon from '@material-ui/icons/Phone';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Typography from '@material-ui/core/Typography';
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
import {
  IconButton,
  Paper,
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  Divider,
  ListItemSecondaryAction,
  Button,
  Container,
} from '@material-ui/core';
import { changeAppStoreData } from '../App/actions';
import PaperWrapper from '../../components/PaperWrapper/Loadable';

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
      content: 'Bạn sẽ mất tiền cọc khi hủy! Bạn thực sự muốn hủy?',
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
      <Container maxWidth="md">
        <PaperWrapper>
          <Typography component="h1" variant="h5">
            Thông tin cá nhân
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PermIdentityIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Tên"
                secondary={`${lastName} ${firstName}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Số diện thoại"
                secondary={`${phoneNumber.countryCode} ${phoneNumber.number}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountBalanceWalletIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Số dư trong ví"
                secondary={Money(wallet)}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => {
                    history.push('/recharge');
                  }}
                >
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <Button
                style={{ margin: 'auto' }}
                onClick={() => {
                  history.push('/');
                }}
              >
                <RoomIcon color="primary" />
                Về bản đồ
              </Button>
            </ListItem>
          </List>
        </PaperWrapper>
        <Grid container align="center">
          {jobs.map(job => (
            <Grid item xs={12} key={job._id}>
              <PaperWrapper style={{ marginTop: 0 }}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={6}>
                    <Typography>{job.fullName}</Typography>
                    <Typography>{job.phoneNumber}</Typography>
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
                        <Typography>Hủy cọc</Typography>
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
                        <Typography>Chi tiết</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </PaperWrapper>
            </Grid>
          ))}
        </Grid>
      </Container>
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
