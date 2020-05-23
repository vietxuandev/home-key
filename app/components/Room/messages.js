/*
 * Room Messages
 *
 * This contains all the text for the Room component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Room';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Room component!',
  },
});
