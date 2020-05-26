/**
 *
 * Logout
 *
 */

import React, { memo } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
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
  const { open = false, handleCloseLogout = () => {} } = props;
  const handleLogout = () => {
    props.getLogout();
  };
  return (
    <div className="logout-wrapper">
      <Dialog
        open={open}
        onClose={handleCloseLogout}
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
          <Button onClick={handleCloseLogout} color="primary">
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
  open: PropTypes.bool,
  handleCloseLogout: PropTypes.func,
  getLogout: PropTypes.func,
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
