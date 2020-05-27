/**
 *
 * MotelCard
 *
 */

import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloseIcon from '@material-ui/icons/Close';
import Money from '../../helper/format';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    position: 'relative',
    maxWidth: 800,
  },
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  image: {
    width: '100%',
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  name: {
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    color: 'red',
  },
  phone: {
    float: 'right',
  },
}));

function MotelCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { motel = {}, setMotel = () => {} } = props;
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <CloseIcon
            className={classes.close}
            onClick={() => {
              setMotel({});
            }}
          />
          <Grid
            container
            spacing={2}
            onClick={() => {
              history.push(`/motel/${motel._id}`);
            }}
          >
            <Grid item xs={4}>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src="/defaul-room.jpg"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={8} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    className={classes.name}
                    gutterBottom
                    variant="subtitle1"
                  >
                    {motel.name}
                  </Typography>
                  <Typography variant="body2">
                    {motel.address.address}
                  </Typography>
                  <Typography className={classes.price} variant="body2">
                    {Money(motel.price)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.phone}
                    variant="body2"
                    color="textSecondary"
                  >
                    Liên hệ: {motel.contactPhone}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

MotelCard.propTypes = {};

export default memo(MotelCard);
