/**
 *
 * PaymentReturn
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPaymentReturn from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getCallBack } from './actions';

export function PaymentReturn(props) {
  useInjectReducer({ key: 'paymentReturn', reducer });
  useInjectSaga({ key: 'paymentReturn', saga });
  const { search: queryString = '' } = props.location;
  useEffect(() => {
    props.getCallBack(queryString);
  }, []);
  return (
    <div>
      <Helmet>
        <title>PaymentReturn</title>
        <meta name="description" content="Description of PaymentReturn" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

PaymentReturn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  paymentReturn: makeSelectPaymentReturn(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCallBack: queryString => {
      dispatch(getCallBack(queryString));
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
)(PaymentReturn);
