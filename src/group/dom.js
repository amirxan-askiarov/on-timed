import { renderTask } from '../task/dom';
import { getGroupNodes } from './static-selectors';
import {
  STANDARD_GROUPS,
  isHTMLElement,
  isNodeList,
  showErrorModal,
} from '../utils';
import { ERR_RENDERING } from './errors-text';

export function renderGroup(newGroup, groupIdentifier) {
  const { mainGroupName, mainGroupIcon, taskList } = getGroupNodes();
  const allGroups = document.querySelectorAll('.bar-types > *, .projects-list > li.project');
  const selectedGroup = document.querySelector(`.bar-types > *[data-group-id="${groupIdentifier}"], 
                                                .projects-list > li.project[data-group-id="${groupIdentifier}"]`);
  const { addTaskIcon } = getGroupNodes();

  let selectedGroupName;
  let selectedGroupIcon;
  if (selectedGroup) {
    selectedGroupName = selectedGroup.querySelector('span');
    selectedGroupIcon = selectedGroup.querySelector('img');
  }

  if (!isHTMLElement(mainGroupName)
    || !isHTMLElement(mainGroupIcon)
    || !isHTMLElement(taskList)
  ) {
    showErrorModal(ERR_RENDERING.CURRENT_GROUP_MAIN);
    return;
  }
  if (!isNodeList(allGroups)) {
    showErrorModal(ERR_RENDERING.ALL_GROUP);
    return;
  }
  if (!isHTMLElement(addTaskIcon)) {
    showErrorModal(ERR_RENDERING.ADD_TASK_ICON);
    return;
  }

  taskList.innerHTML = '';
  newGroup.forEach((task) => renderTask(task));

  if (!Object.values(STANDARD_GROUPS).includes(groupIdentifier)) {
    addTaskIcon.classList.add('shown');
  } else {
    addTaskIcon.classList.remove('shown');
  }

  allGroups.forEach((group) => group.classList.remove('current'));

  if (selectedGroup) {
    selectedGroup.classList.add('current');
    mainGroupName.textContent = selectedGroupName.textContent;
    mainGroupIcon.src = selectedGroupIcon.src;
    mainGroupIcon.alt = selectedGroupIcon.alt;
  }
}
