/**
 *
 * NavDrawer
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

function NavDrawer(props) {
  const { open = false, setOpen = () => {} } = props;
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
        <ListItem button key={'home'} component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={'Trang chủ'} />
        </ListItem>
        <ListItem button key={'info'}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={'Giới thiệu'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
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

NavDrawer.propTypes = {};

export default memo(NavDrawer);
