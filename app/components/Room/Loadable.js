/**
 *
 * Asynchronously loads the component for Room
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
