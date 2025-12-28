import { renderTask } from '../task/dom';
import { getGroupNodes } from './static-selectors';
import {
  STANDARD_GROUPS,
  createErrorObj,
  eachIsHTMLElement,
  isNodeList,
  showErrorModal,
} from '../utils';
import { ERR_RENDERING } from './errors-text';

export function renderGroup(newGroup, groupIdentifier) {
  const {
    mainGroupName, mainGroupIcon, taskList, addTaskIcon,
  } = getGroupNodes();
  const allGroups = document.querySelectorAll(
    '.bar-types > *, .projects-list > li.project',
  );
  const selectedGroup = document.querySelector(`.bar-types > *[data-group-id="${groupIdentifier}"], 
                                                .projects-list > li.project[data-group-id="${groupIdentifier}"]`);

  if (!eachIsHTMLElement(mainGroupName, mainGroupIcon, taskList)) {
    const err = createErrorObj(ERR_RENDERING.CURRENT_GROUP_MAIN);
    showErrorModal(err);
    return;
  }
  if (!isNodeList(allGroups)) {
    const err = createErrorObj(ERR_RENDERING.ALL_GROUP);
    showErrorModal(err);
    return;
  }
  if (!eachIsHTMLElement(addTaskIcon)) {
    const err = createErrorObj(ERR_RENDERING.ADD_TASK_ICON);
    showErrorModal(err);
    return;
  }

  addTaskIcon.classList.toggle(
    'shown',
    !Object.values(STANDARD_GROUPS).includes(groupIdentifier),
  );

  allGroups.forEach((group) => group.classList.remove('current'));

  if (eachIsHTMLElement(selectedGroup)) {
    const selectedGroupName = selectedGroup.querySelector('span');
    const selectedGroupIcon = selectedGroup.querySelector('img');

    if (eachIsHTMLElement(selectedGroupName, selectedGroupIcon)) {
      selectedGroup.classList.add('current');
      mainGroupName.textContent = selectedGroupName.textContent || '';
      mainGroupIcon.src = selectedGroupIcon.src || '';
      mainGroupIcon.alt = selectedGroupIcon.alt || '';
    }
  }

  taskList.replaceChildren();
  newGroup.forEach((task) => renderTask(task));
}
