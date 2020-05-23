/**
 *
 * FloorDetail
 *
 */

import React, { memo, useState } from 'react';
import './style.scss';
import ClassNames from 'classnames';
import { Row, Col } from 'reactstrap';
import _ from 'lodash';
import Room from '../Room';

function FloorDetail(props) {
  const { floors = [] } = props.motelPage.motel;
  const [index, setIndex] = useState(0);
  return (
    <div className="floor-detail-wrapper">
      <div className="topnav">
        {floors.map((item, key) => (
          <div
            key={key}
            className={ClassNames('item', { active: index === key })}
            onClick={() => {
              index !== key && setIndex(key);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="room-list">
        <Row>
          {floors[index] &&
            floors[index].rooms &&
            floors[index].rooms.map((item, key) => (
              <Col xs={6} key={key}>
                <Room item={item} status={props.status} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

FloorDetail.propTypes = {};

export default memo(FloorDetail);
