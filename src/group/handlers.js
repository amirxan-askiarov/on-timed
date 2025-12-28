import { getGroupNodes } from './static-selectors';
import { renderGroup } from './dom';
import {
  eachIsHTMLElement,
  isPressedKey,
  createErrorObj,
  eachIsValid,
} from '../utils';

export const handleGroupSelection = (e, application) => {
  if (isPressedKey(e)) {
    const validTarget = !e.target.classList.contains('non-select');
    const selectedGroup = e.target.closest(
      '.bar-types > *, .projects-list > li.project',
    );

    if (
      validTarget
      && selectedGroup
      && !selectedGroup.classList.contains('current')
    ) {
      const { sidebar } = getGroupNodes();
      if (!eachIsHTMLElement(sidebar)) {
        throw createErrorObj(ERR_EVENTS.NO_SIDEBAR);
      }

      const groupIdentifier = selectedGroup.getAttribute('data-group-id');
      if (!eachIsValid(groupIdentifier)) {
        throw createErrorObj(ERR_EVENTS.NO_GROUP_ID);
      }

      const selectedTasksGroup = application.getTasksGroup(groupIdentifier);
      if (!selectedTasksGroup) {
        throw createErrorObj(ERR_EVENTS.NEW_GROUP);
      }

      const currentViewState = application.getViewState();
      if (!currentViewState) {
        throw createErrorObj(ERR_EVENTS.NEW_GROUP);
      }

      const filteredSortedFirstPage = application.applyViewOptions(
        currentViewState,
        selectedTasksGroup,
      );
      if (!filteredSortedFirstPage) {
        throw createErrorObj(ERR_EVENTS.NEW_GROUP);
      }

      sidebar.setAttribute('current-group', groupIdentifier);
      renderGroup(filteredSortedFirstPage, groupIdentifier);
    }
  }
};
