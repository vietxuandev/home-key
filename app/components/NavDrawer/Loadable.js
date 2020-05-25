/**
 *
 * Asynchronously loads the component for NavDrawer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
