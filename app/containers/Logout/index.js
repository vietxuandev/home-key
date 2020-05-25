/**
 *
 * Logout
 *
 */

import React, { memo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogout from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getLogout } from './actions';

export function Logout(props) {
  useInjectReducer({ key: 'logout', reducer });
  useInjectSaga({ key: 'logout', saga });
  const { open = false, handleClose = () => {} } = props;
  const handleLogout = () => {
    props.getLogout();
  };
  return (
    <div className="logout-wrapper">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Đăng xuất</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn thực sự muốn đăng xuất?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleLogout} color="primary">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Logout.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  logout: makeSelectLogout(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLogout: () => {
      dispatch(getLogout());
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
)(Logout);
