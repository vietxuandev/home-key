/**
 *
 * MotelPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams, useHistory } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMotelPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { getMotel } from '../MotelRoom/actions';

import './style.scss';
import { Button, Typography, Grid } from '@material-ui/core';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import Money from '../../helper/format';

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: 10,
  },
  submit: {
    marginTop: 15,
  },
}));

export function MotelPage(props) {
  useInjectReducer({ key: 'motelPage', reducer });
  useInjectSaga({ key: 'motelPage', saga });
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    props.getMotel(id);
  }, []);
  const { motel = {} } = props.motelPage;
  const { images = [] } = motel;
  const {
    _id,
    name = '',
    totalFloor = '',
    totalRoom = '',
    price = '',
    description = '',
    address = {},
  } = motel;

  return (
    <div className="motel-page-wrapper">
      <Helmet>
        <title>MotelPage</title>
        <meta name="description" content="Description of MotelPage" />
      </Helmet>
      <Container maxWidth="md">
        <PaperWrapper>
          <Carousel autoPlay showThumbs={false}>
            {images.map(image => (
              <div key={image}>
                <img alt="" src={image} />
              </div>
            ))}
          </Carousel>
          <div className="content">
            <Typography className="name bold">{name}</Typography>
            <div className="details">
              <Typography className="detail totalFloor">
                Số tầng: <span className="bold">{totalFloor}</span> tầng
              </Typography>
              <Typography className="detail totalRoom">
                Tất cả: <span className="bold">{totalRoom}</span> phòng
              </Typography>
            </div>
            <Typography className="price">
              Giá giao động: <span className="red-price">{Money(price)}</span>
            </Typography>
            <Typography className="description">
              Mô tả: {description}
            </Typography>
            <Typography className="address">
              Địa chỉ: {address.address}
            </Typography>
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(`/motel-room/${_id}`);
            }}
          >
            Chi tiết
          </Button>
        </PaperWrapper>
      </Container>
    </div>
  );
}

MotelPage.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  motelPage: makeSelectMotelPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotel: id => {
      dispatch(getMotel(id));
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
)(MotelPage);
