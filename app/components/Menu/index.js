/**
 *
 * Menu
 *
 */

import React, { memo } from 'react';
import ClassNames from 'classnames';
import './style.scss';

function Menu(props) {
  const { toggle = false } = props;
  return (
    <div className="menu-button-wrapper">
      <div id="nav-icon" className={ClassNames({ open: toggle })}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

Menu.propTypes = {};

export default memo(Menu);
