import _ from 'lodash';
import { getProjectsBarFooterNodes } from './static-selectors';
import {
  handleMovePrevProjectsPage,
  handleMoveNextProjectsPage,
} from './projects-handlers';
import { KEYPRESS_THROTTLE_TIME } from '../utils';

export function addListenersProjectsPagesNav(application) {
  const { prevPageBtn, nextPageBtn } = getProjectsBarFooterNodes();

  const handleMovePrevProjectsPageThrottle = _
    .throttle((e, app) => handleMovePrevProjectsPage(e, app), KEYPRESS_THROTTLE_TIME);
  prevPageBtn.addEventListener('click', (e) => handleMovePrevProjectsPageThrottle(e, application));
  prevPageBtn.addEventListener('keydown', (e) => handleMovePrevProjectsPageThrottle(e, application));

  const handleMoveNextProjectsPageThrottle = _
    .throttle((e, app) => handleMoveNextProjectsPage(e, app), KEYPRESS_THROTTLE_TIME);
  nextPageBtn.addEventListener('click', (e) => handleMoveNextProjectsPageThrottle(e, application));
  nextPageBtn.addEventListener('keydown', (e) => handleMoveNextProjectsPageThrottle(e, application));
}
