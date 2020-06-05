/**
 *
 * JobVerify
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
import makeSelectJobVerify from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function JobVerify() {
  useInjectReducer({ key: 'jobVerify', reducer });
  useInjectSaga({ key: 'jobVerify', saga });

  return (
    <div>
      <Helmet>
        <title>JobVerify</title>
        <meta name="description" content="Description of JobVerify" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

JobVerify.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  jobVerify: makeSelectJobVerify(),
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
)(JobVerify);
