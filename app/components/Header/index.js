/**
 *
 * Header
 *
 */

import React, { memo, useState } from 'react';
import ClassNames from 'classnames';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import './style.scss';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Menu from '../Menu/Loadable';

function Header(props) {
  const { currentUser = {}, changeStoreData = () => {} } = props;
  const [toggle, setToggle] = useState(false);
  return (
    <div className="header-wrapper">
      <div className="header-content clearfix">
        <div className="text-logo">
          <NavLink exact to="/">
            <div className="logo-text">
              <img className="logo zoom-hover" src="/favicon.png" alt="logo" />{' '}
              Home
            </div>
          </NavLink>
        </div>
        <div
          className={ClassNames(
            'site-nav',
            { 'mobile-menu-hide': !toggle },
            { 'mobile-menu-show': toggle },
          )}
        >
          <ul className="site-main-menu">
            <li>
              <NavLink
                exact
                to="/contact"
                onClick={() => {
                  setToggle(false);
                }}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/about"
                onClick={() => {
                  setToggle(false);
                }}
              >
                About
              </NavLink>
            </li>
            {!_.isEmpty(currentUser) ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Xin chào{' '}
                  <strong>
                    {currentUser.lastName} {currentUser.firstName}{' '}
                  </strong>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/profile">Thông tin cá nhân</DropdownItem>
                  <DropdownItem>Đổi mật khẩu</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      props.changeStoreData('showLogout', true);
                    }}
                  >
                    Đăng Xuất
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <li>
                <NavLink
                  exact
                  to="/auth/login"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <i className="fa fa-sign-in" aria-hidden="true" /> Sign
                  in/Sign up
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div
          className="menu-toggle mobile-visible"
          onClick={() => {
            setToggle(!toggle);
          }}
          role="presentation"
        >
          <Menu toggle={toggle} />
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default memo(Header);
