/*
 * ErrorDialog Messages
 *
 * This contains all the text for the ErrorDialog component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ErrorDialog';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ErrorDialog component!',
  },
});
