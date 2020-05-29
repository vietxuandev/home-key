/**
 *
 * NavDrawer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function NavDrawer(props) {
  const {
    open = false,
    setOpen = () => {},
    handleShowLogout = () => {},
    currentUser = {},
  } = props;
  const classes = useStyles();
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => {
        setOpen(false);
      }}
      onKeyDown={() => {
        setOpen(false);
      }}
    >
      <List>
        <ListItem button key="home" component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItem>
        <ListItem button key="info">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Giới thiệu" />
        </ListItem>
      </List>
      <Divider />
      {!_.isEmpty(currentUser) && (
        <List>
          <ListItem button key="logout" onClick={() => handleShowLogout(true)}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng xuất" />
          </ListItem>
        </List>
      )}
    </div>
  );
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      {list()}
    </Drawer>
  );
}

NavDrawer.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default memo(NavDrawer);
