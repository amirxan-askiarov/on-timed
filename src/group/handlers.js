import { getGroupNodes } from './static-selectors';
import { renderGroup } from './dom';
import {
  isHTMLElement, isPressedKey, showErrorModal, isValid,
} from '../utils';

export const handleGroupSelection = (e, application) => {
  if (isPressedKey(e)) {
    const validTarget = !e.target.classList.contains('non-select');
    const selectedGroup = e.target.closest('.bar-types > *, .projects-list > li.project');

    if (validTarget && selectedGroup && !selectedGroup.classList.contains('current')) {
      const { sidebar } = getGroupNodes();
      if (!isHTMLElement(sidebar)) {
        showErrorModal(ERR_EVENTS.NO_SIDEBAR);
        return;
      }

      const groupIdentifier = selectedGroup.getAttribute('data-group-id');
      if (!isValid(groupIdentifier)) {
        showErrorModal(ERR_EVENTS.NO_GROUP_ID);
        return;
      }

      let newGroup;
      try {
        newGroup = application.getTasksGroup(groupIdentifier);
      } catch (err) {
        showErrorModal([ERR_EVENTS.NEW_GROUP[0], err.message, ERR_EVENTS.NEW_GROUP[2]]);
        return;
      }

      let currentViewState;
      try {
        currentViewState = application.getViewState();
      } catch (err) {
        showErrorModal([ERR_EVENTS.NEW_GROUP[0], err.message, ERR_EVENTS.NEW_GROUP[2]]);
        return;
      }

      let filteredSortedFirstPage;
      try {
        filteredSortedFirstPage = application.applyViewOptions(currentViewState, newGroup);
      } catch (err) {
        showErrorModal([ERR_EVENTS.NEW_GROUP[0], err.message, ERR_EVENTS.NEW_GROUP[2]]);
        return;
      }

      sidebar.setAttribute('current-group', groupIdentifier);
      renderGroup(filteredSortedFirstPage, groupIdentifier);
    }
  }
};
