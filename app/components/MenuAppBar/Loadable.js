/**
 *
 * Asynchronously loads the component for MenuAppBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
