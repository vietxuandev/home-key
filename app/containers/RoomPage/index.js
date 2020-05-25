/**
 *
 * RoomPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRoomPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function RoomPage() {
  useInjectReducer({ key: 'roomPage', reducer });
  useInjectSaga({ key: 'roomPage', saga });

  return (
    <div>
      <Helmet>
        <title>RoomPage</title>
        <meta name="description" content="Description of RoomPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

RoomPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  roomPage: makeSelectRoomPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
