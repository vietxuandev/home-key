/**
 *
 * MotelPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMotelPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function MotelPage(props) {
  useInjectReducer({ key: 'motelPage', reducer });
  useInjectSaga({ key: 'motelPage', saga });
  useEffect(() => {
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      // fade out
      ele.classList.add('available');
      setTimeout(() => {
        // remove from DOM
        const nele = document.getElementById('ipl-progress-indicator');
        if (nele) {
          nele.outerHTML = '';
        }
      }, 2000);
    }
  }, []);
  const id = props.match.params.id;
  return (
    <div>
      <Helmet>
        <title>MotelPage</title>
        <meta name="description" content="Description of MotelPage" />
      </Helmet>
      <div>{id}</div>
    </div>
  );
}

MotelPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  motelPage: makeSelectMotelPage(),
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
)(MotelPage);
