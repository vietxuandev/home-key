/**
 *
 * RoomPage
 *
 */

import React, { memo, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams, useHistory } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRoomPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getRoom } from './actions';
import './style.scss';
import Money from '../../helper/format';
import { Container, Grid } from '@material-ui/core';
import PaperWrapper from '../../components/PaperWrapper';
export function RoomPage(props) {
  useInjectReducer({ key: 'roomPage', reducer });
  useInjectSaga({ key: 'roomPage', saga });
  const { id } = useParams();
  const history = useHistory();
  const { room = {} } = props.roomPage;

  useEffect(() => {
    props.getRoom(id);
  }, []);

  const {
    utilities = [],
    name = '',
    price = '',
    electricityPrice = '',
    waterPrice = '',
    images = [],
  } = room;

  return (
    <div className="room-page-wrapper">
      <Helmet>
        <title>RoomPage</title>
        <meta name="description" content="Description of RoomPage" />
      </Helmet>
      <Container maxWidth="md">
        <PaperWrapper>
          <div className="infor">
            <Carousel autoPlay showThumbs={false}>
              {images.map(image => (
                <div key={image}>
                  <img alt="" src={image} />
                </div>
              ))}
            </Carousel>
            <Container>
              <div className="room-detail">
                <div className="name-room">THÔNG TIN PHÒNG {name}</div>
                <div className="price-room">{Money(price)}</div>
                <Grid container className="price-wrapper">
                  <Grid item xs={6}>
                    <div className="item">
                      <div className="icon">
                        <img src="/electric.png" alt="electric" />
                      </div>
                      <div className="price">{Money(electricityPrice)}</div>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="item">
                      <div className="icon">
                        <img src="/water.png" alt="water" />
                      </div>
                      <div className="price">{Money(waterPrice)}</div>
                    </div>
                  </Grid>
                </Grid>
                <div className="furniture">
                  <div className="title">Nội thất</div>
                  <Grid container>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                  </Grid>
                </div>
                <div className="utilities">
                  <div className="title">Tiện ích</div>
                  <Grid container>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
                      <div className="item">
                        {utilities.includes('dieu_hoa') && (
                          <div className="checked">
                            <img src="/checked.png" alt="checked" />
                          </div>
                        )}
                        <div className="icon">
                          <img
                            src="../air_conditioner.png"
                            alt="air conditioner"
                          />
                        </div>
                        <div className="name">Điều hòa</div>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Container>
          </div>
          <div className="more-infor">
            <Container>
              <div className="title">Mô tả thêm</div>
              <Grid container>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
              </Grid>
            </Container>
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={room.status !== 'available'}
            onClick={() => {
              history.push(`/job/${id}`);
            }}
          >
            Đặt cọc
          </Button>
        </PaperWrapper>
      </Container>
    </div>
  );
}

RoomPage.propTypes = {
  roomPage: PropTypes.object,
  getRoom: PropTypes.func,
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
