/**
 *
 * JobVerify
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJobVerify from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Container, Typography, Grid } from '@material-ui/core';
import PaperWrapper from '../../components/PaperWrapper/Loadable';

export function JobVerify() {
  useInjectReducer({ key: 'jobVerify', reducer });
  useInjectSaga({ key: 'jobVerify', saga });

  return (
    <div>
      <Helmet>
        <title>JobVerify</title>
        <meta name="description" content="Description of JobVerify" />
      </Helmet>
      <Container maxWidth="md">
        <PaperWrapper>
          <Typography component="h1" variant="h5">
            Xác minh danh tính
          </Typography>
          <Typography>
            Vui lòng cung cấp chứng minh nhân dân để xác minh danh tính
          </Typography>
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12} md={6}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                multiple
                type="file"
                // onChange={this.handleUploadClick}
              />
              <label htmlFor="contained-button-file">
                <AddPhotoAlternateIcon />
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                multiple
                type="file"
                // onChange={this.handleUploadClick}
              />
              <label htmlFor="contained-button-file">
                <AddPhotoAlternateIcon />
              </label>
            </Grid>
          </Grid>
        </PaperWrapper>
      </Container>
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
