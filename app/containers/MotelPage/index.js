/**
 *
 * MotelPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { Button } from '@material-ui/core';
import Money from '../../helper/format';

export function MotelPage(props) {
  useInjectReducer({ key: 'motelPage', reducer });
  useInjectSaga({ key: 'motelPage', saga });
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
      <Carousel autoPlay showThumbs={false}>
        {images.map(image => (
          <div key={image}>
            <img alt="" src={image} />
          </div>
        ))}
      </Carousel>
      <Container>
        <div className="content">
          <div className="name bold">{name}</div>
          <div className="details">
            <div className="detail totalFloor">
              Số tầng: <span className="bold">{totalFloor}</span> tầng
            </div>
            <div className="detail totalRoom">
              Tất cả: <span className="bold">{totalRoom}</span> phòng
            </div>
          </div>
          <div className="price">
            Giá giao động: <span className="red-price">{Money(price)}</span>
          </div>
          <div className="description">Mô tả: {description}</div>
          <div className="address">Địa chỉ: {address.address}</div>
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
