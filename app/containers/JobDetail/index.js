/**
 *
 * JobDetail
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
import makeSelectJobDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function JobDetail() {
  useInjectReducer({ key: 'jobDetail', reducer });
  useInjectSaga({ key: 'jobDetail', saga });

  return (
    <div>
      <Helmet>
        <title>JobDetail</title>
        <meta name="description" content="Description of JobDetail" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

JobDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  jobDetail: makeSelectJobDetail(),
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
)(JobDetail);
