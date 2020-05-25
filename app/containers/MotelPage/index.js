/**
 *
 * MotelPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
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

import { UncontrolledCarousel, Container } from 'reactstrap';
import { getMotel } from '../MotelRoom/actions';

import './style.scss';
import { Button } from '@material-ui/core';

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
  const items = [];
  images.map((item, key) => {
    items.push({
      key,
      src: item,
      altText: '',
      caption: '',
      header: '',
    });
  });
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
      <UncontrolledCarousel className="image-slider" items={items} />
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
            Giá giao động: <span className="red-price">{price}</span>
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
