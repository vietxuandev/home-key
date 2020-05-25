/**
 *
 * RoomPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams, useHistory } from 'react-router-dom';
import { UncontrolledCarousel, Row, Col, Container } from 'reactstrap';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRoomPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getRoom } from './actions';
import './style.scss';
import { Button } from '@material-ui/core';

export function RoomPage(props) {
  useInjectReducer({ key: 'roomPage', reducer });
  useInjectSaga({ key: 'roomPage', saga });
  const { id } = useParams();
  const history = useHistory();
  const { room = {}, roomErrors = [] } = props.roomPage;
  const { getRoom = () => {} } = props;

  useEffect(() => {
    getRoom(id);
  }, []);

  const {
    utilities = [],
    name = '',
    price = '',
    electricityPrice = '',
    waterPrice = '',
    images = [],
  } = room;

  images.map((image, index) => ({
    key: index,
    src: image,
    altText: '',
    caption: '',
    header: '',
  }));

  return (
    <div className="room-page-wrapper">
      <Helmet>
        <title>RoomPage</title>
        <meta name="description" content="Description of RoomPage" />
      </Helmet>
      <div className="infor">
        <UncontrolledCarousel className="image-slider" items={images} />
        <Container>
          <div className="room-detail">
            <div className="name-room">THÔNG TIN PHÒNG {name}</div>
            <div className="price-room">{price}</div>
            <Row className="price-wrapper">
              <Col xs={6}>
                <div className="item">
                  <div className="icon">
                    <img src="/electric.png" alt="electric" />
                  </div>
                  <div className="price">{electricityPrice}</div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="item">
                  <div className="icon">
                    <img src="/water.png" alt="water" />
                  </div>
                  <div className="price">{waterPrice}</div>
                </div>
              </Col>
            </Row>
            <div className="furniture">
              <div className="title">Nội thất</div>
              <Row>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('gac_lung') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../stairs.png" alt="stairs" />
                    </div>
                    <div className="name">Gác lửng</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('tu_quan_ao') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../wardrobe.png" alt="wardrobe" />
                    </div>
                    <div className="name">Tủ quần áo</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('voi_hoa_sen') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../shower.png" alt="shower" />
                    </div>
                    <div className="name">Vòi hoa sen</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('san_go') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../dropceiling.png" alt="dropceiling" />
                    </div>
                    <div className="name">Sàn gỗ</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('bon_cau') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../toiletbowl.png" alt="toiletbowl" />
                    </div>
                    <div className="name">Bồn cầu</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('bon_rua_mat') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../washstand.png" alt="washstand" />
                    </div>
                    <div className="name">Bồn rữa chén</div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="utilities">
              <div className="title">Tiện ích</div>
              <Row>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('wifi') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../wifi.png" alt="wifi" />
                    </div>
                    <div className="name">Wifi</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('giat_ui') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../laundry.png" alt="laundry" />
                    </div>
                    <div className="name">Giặt sấy</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('giu_xe') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../delivery.png" alt="delivery" />
                    </div>
                    <div className="name">Giữ xe</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('dieu_hoa') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../air_conditioner.png" alt="air conditioner" />
                    </div>
                    <div className="name">Điều hòa</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('don_phong') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../broom.png" alt="broom" />
                    </div>
                    <div className="name">Dọn phòng</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="item">
                    {utilities.includes('truyen_hinh') && (
                      <div className="checked">
                        <img src="/checked.png" alt="checked" />
                      </div>
                    )}
                    <div className="icon">
                      <img src="../television.png" alt="television" />
                    </div>
                    <div className="name">Truyền hình cáp</div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
      <div className="more-infor">
        <Container>
          <div className="title">Mô tả thêm</div>
          <Row>
            <Col xs={6}>
              <div className="item">
                {utilities.includes('gio_giac_tu_do') && (
                  <div className="checked">
                    <img src="/checked.png" alt="checked" />
                  </div>
                )}
                <div className="icon">
                  <img src="../time.png" alt="time" />
                </div>
                <div className="name">Giờ giấc tự do</div>
              </div>
            </Col>
            <Col xs={6}>
              <div className="item">
                {utilities.includes('loi_di_rieng') && (
                  <div className="checked">
                    <img src="/checked.png" alt="checked" />
                  </div>
                )}
                <div className="icon">
                  <img src="../gate.png" alt="gate" />
                </div>
                <div className="name">Lối đi riêng</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="button">
        <div className="button-deposit">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={room.status === 'rented'}
            onClick={() => {
              history.push(`/job/${id}`);
            }}
          >
            Đặt cọc
          </Button>
        </div>
      </div>
    </div>
  );
}

RoomPage.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  roomPage: makeSelectRoomPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRoom: id => {
      dispatch(getRoom(id));
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
)(RoomPage);
