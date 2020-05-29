/**
 *
 * JobDetail
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJobDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getJob } from './actions';

export function JobDetail(props) {
  useInjectReducer({ key: 'jobDetail', reducer });
  useInjectSaga({ key: 'jobDetail', saga });
  const { id = '' } = useParams();
  const { job } = props.jobDetail;
  useEffect(() => {
    props.getJob(id);
  }, []);
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
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  jobDetail: makeSelectJobDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJob: id => {
      dispatch(getJob(id));
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
)(JobDetail);
