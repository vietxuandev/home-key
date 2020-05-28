/**
 *
 * FloorDetail
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import './style.scss';
import Room from '../Room/Loadable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    alignItems: 'center',
  },
  floor: {
    maxWidth: 300,
  },
}));

function FloorDetail(props) {
  const { floors = [], status = '' } = props;

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="floor-detail-wrapper">
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {floors.map((item, index) => (
              /* eslint no-underscore-dangle: 0 */
              <Tab key={item._id} label={item.name} {...a11yProps(index)} />
            ))}
          </Tabs>
        </AppBar>
        {floors.map((floor, index) => (
          /* eslint no-underscore-dangle: 0 */
          <TabPanel key={floor._id} value={value} index={index}>
            <Container className={classes.floor}>
              <Grid container>
                {floor.rooms &&
                  floor.rooms.map(item => (
                    <Grid item xs={6} key={item._id}>
                      <Room item={item} status={status} />
                    </Grid>
                  ))}
              </Grid>
            </Container>
          </TabPanel>
        ))}
      </div>
    </div>
  );
}

FloorDetail.propTypes = {
  floors: PropTypes.array,
  status: PropTypes.string,
};

TabPanel.propTypes = {
  children: PropTypes.object,
  value: PropTypes.number,
  index: PropTypes.number,
};

export default memo(FloorDetail);
