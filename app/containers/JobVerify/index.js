/**
 *
 * JobVerify
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJobVerify from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
} from '@material-ui/core';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import { putImages, changeStoreData } from './actions';
import DeleteIcon from '@material-ui/icons/Delete';
import './style.scss';

export function JobVerify(props) {
  useInjectReducer({ key: 'jobVerify', reducer });
  useInjectSaga({ key: 'jobVerify', saga });
  const { id } = useParams();
  const [frontID, setFrontID] = useState('');
  const [backID, setBackID] = useState('');
  const [frontIDUrl, setFrontIDUrl] = useState('');
  const [backIDUrl, setBackIDUrl] = useState('');
  useEffect(() => {
    if (frontID) {
      setFrontIDUrl(URL.createObjectURL(frontID));
    } else {
      setFrontIDUrl('');
    }
  }, [frontID]);
  useEffect(() => {
    if (backID) {
      setBackIDUrl(URL.createObjectURL(backID));
    } else {
      setBackIDUrl('');
    }
  }, [backID]);
  return (
    <div className="job-verify-wrapper">
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
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <div className="image-wrapper">
                {frontIDUrl && <img src={frontIDUrl} alt="front identify" />}
                <input
                  accept="image/*"
                  id="frontID"
                  type="file"
                  onChange={e => {
                    setFrontID(e.target.files[0]);
                  }}
                />
                {frontIDUrl ? (
                  <IconButton
                    onClick={() => {
                      setFrontID('');
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <label className="label-input" htmlFor="frontID">
                    <AddPhotoAlternateIcon />
                    <Typography>Mặt trước</Typography>
                  </label>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="image-wrapper">
                {backIDUrl && <img src={backIDUrl} alt="back identify" />}
                <input
                  accept="image/*"
                  id="backID"
                  type="file"
                  onChange={e => {
                    setBackID(e.target.files[0]);
                  }}
                />
                {backIDUrl ? (
                  <IconButton
                    onClick={() => {
                      setBackID('');
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <label className="label-input" htmlFor="backID">
                    <AddPhotoAlternateIcon />
                    <Typography>Mặt Sau</Typography>
                  </label>
                )}
              </div>
            </Grid>
          </Grid>
          <Button
            style={{ marginTop: '20px' }}
            fullWidth
            variant="contained"
            color="primary"
            disabled={!Boolean(frontID && backID)}
            onClick={() => {
              const formData = new FormData();
              formData.append('file', frontID);
              formData.append('file', backID);
              props.putImages(id, formData);
            }}
          >
            Hoàn thành
          </Button>
        </PaperWrapper>
      </Container>
    </div>
  );
}

JobVerify.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  jobVerify: makeSelectJobVerify(),
});

function mapDispatchToProps(dispatch) {
  return {
    putImages: (id, formData) => {
      dispatch(putImages(id, formData));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
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
)(JobVerify);
