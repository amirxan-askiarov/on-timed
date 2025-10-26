import _ from 'lodash';
import {
  isHTMLElement, isPressedKey, showErrorModal, KEYPRESS_THROTTLE_TIME,
} from '../utils';
import { ERR_EVENTS } from './errors-text';
import { handleGroupSelection } from './handlers';

export function addListenersSidebar(application) {
  const sidebarIcon = document.querySelector('header > .sidebar-icon');
  const sidebar = document.querySelector('aside');
  const sidebarCover = document.querySelector('.sidebar-cover');
  const standardGroups = document.querySelector('.bar-types');
  const projectGroups = document.querySelector('.projects-list');

  if (!isHTMLElement(sidebarIcon)
        || !isHTMLElement(sidebar)
        || !isHTMLElement(sidebarCover)
        || !isHTMLElement(standardGroups)
        || !isHTMLElement(projectGroups)
  ) {
    showErrorModal(ERR_EVENTS.SIDEBAR_ELEMENTS);
    return;
  }

  const handleSidebarToggleThrottle = _
    .throttle((e) => handleSidebarToggle(e), KEYPRESS_THROTTLE_TIME);
  function handleSidebarToggle(e) {
    if (isPressedKey(e)) {
      sidebar.classList.toggle('shown');
      sidebarCover.classList.toggle('shown');
    }
  }
  sidebarIcon.addEventListener('click', (e) => handleSidebarToggleThrottle(e));

  const handleGroupSelectionThrottle = _
    .throttle((e, app) => handleGroupSelection(e, app), KEYPRESS_THROTTLE_TIME);
  standardGroups.addEventListener('click', (e) => handleGroupSelectionThrottle(e, application));
  standardGroups.addEventListener('keydown', (e) => handleGroupSelectionThrottle(e, application));

  projectGroups.addEventListener('click', (e) => handleGroupSelectionThrottle(e, application));
  projectGroups.addEventListener('keydown', (e) => handleGroupSelectionThrottle(e, application));
}
