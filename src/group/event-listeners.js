import {
  eachIsHTMLElement,
  isPressedKey,
  KEYPRESS_THROTTLE_TIME,
  showErrorModal,
  safeThrottle,
  createErrorObj,
} from '../utils';
import { ERR_EVENTS } from './errors-text';
import { handleGroupSelection } from './handlers';

export function addListenersSidebar(application) {
  const sidebarIcon = document.querySelector('header > .sidebar-icon');
  const sidebar = document.querySelector('aside');
  const sidebarCover = document.querySelector('.sidebar-cover');
  const standardGroups = document.querySelector('.bar-types');
  const projectGroups = document.querySelector('.projects-list');

  if (
    !eachIsHTMLElement(
      sidebarIcon,
      sidebar,
      sidebarCover,
      standardGroups,
      projectGroups,
    )
  ) {
    const err = createErrorObj(ERR_EVENTS.SIDEBAR_ELEMENTS);
    showErrorModal(err);
    return;
  }

  const handleSidebarToggleThrottle = safeThrottle(
    (e) => handleSidebarToggle(e),
    showErrorModal,
    KEYPRESS_THROTTLE_TIME,
  );

  function handleSidebarToggle(e) {
    if (isPressedKey(e)) {
      sidebar.classList.toggle('shown');
      sidebarCover.classList.toggle('shown');
    }
  }
  sidebarIcon.addEventListener('click', (e) => handleSidebarToggleThrottle(e));

  const handleGroupSelectionThrottle = safeThrottle(
    (e, app) => handleGroupSelection(e, app),
    showErrorModal,
    KEYPRESS_THROTTLE_TIME,
  );

  standardGroups.addEventListener('click', (e) => handleGroupSelectionThrottle(e, application));
  standardGroups.addEventListener('keydown', (e) => handleGroupSelectionThrottle(e, application));

  projectGroups.addEventListener('click', (e) => handleGroupSelectionThrottle(e, application));
  projectGroups.addEventListener('keydown', (e) => handleGroupSelectionThrottle(e, application));
}
