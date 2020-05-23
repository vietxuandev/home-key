/**
 *
 * AlertDialog
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AlertDialog() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AlertDialog.propTypes = {};

export default memo(AlertDialog);
