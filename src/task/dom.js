import {
  createElementWithAttributes,
  showErrorModal,
  isHTMLElement,
  isValid,
  ACTIONS_TASKS,
  convertPriorityCodeToText,
} from '../utils';
import { getTaskNodes } from './static-selectors';
import { assets } from './assets';
import { ERR_RENDERING } from './errors-text';

export function renderTask(taskObj) {
  const { taskList } = getTaskNodes();
  const {
    projectId,
    projectName,
    id,
    title,
    dueDate,
    status,
    priority,
    description,
    notes,
  } = taskObj;

  if (!isHTMLElement(taskList)) {
    showErrorModal(ERR_RENDERING.TASK_LIST_PANEL);
    return;
  }
  if (!isValid(projectId)
        || !projectName
        || !isValid(id)
        || !title
        || !dueDate
        || !status
        || !priority
  ) {
    showErrorModal(ERR_RENDERING.TASK_VALUES);
    return;
  }

  const task = createElementWithAttributes('li', { class: 'task' }, taskList);
  task.setAttribute('data-project-id', `${projectId}`);
  task.setAttribute('data-task-id', `${id}`);
  task.setAttribute('data-task-status', `${status}`);
  task.setAttribute('data-task-priority', `${priority}`);

  const taskHeadBox = createElementWithAttributes('div', { class: 'task-head-box' }, task);
  const taskHeadBoxOne = createElementWithAttributes('div', { class: 'task-head-box-one' }, taskHeadBox);

  const checkbox = createElementWithAttributes('input', {
    type: 'checkbox',
    id: `status-task-${title}-project-${projectName}`,
    class: 'status',
  }, taskHeadBoxOne);

  const label = createElementWithAttributes('label', {
    for: `status-task-${title}-project-${projectName}`,
    class: 'status-checkbox',
    tabindex: 0,
  }, taskHeadBoxOne);
  label.setAttribute('data-task-action', ACTIONS_TASKS.UPDATE_STATUS);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M2,10 L8,16 L18,5');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.classList.add('status-checkbox');
  svg.setAttribute('viewBox', '0 0 20 20');

  svg.appendChild(path);
  label.appendChild(svg);

  const taskTitleBox = createElementWithAttributes('div', { class: 'task-title-box' }, taskHeadBoxOne);
  const taskTitle = createElementWithAttributes('span', { class: 'task-title' }, taskTitleBox);
  taskTitle.textContent = `${title}`;

  const taskHeadBoxTwo = createElementWithAttributes('div', { class: 'task-head-box-two' }, taskHeadBox);

  const taskOverDueBox = createElementWithAttributes('div', {
    class: 'overdue-box',
  }, taskHeadBoxTwo);

  const taskOverDueIcon = createElementWithAttributes('img', {
    src: assets.taskOverDueIconPath,
    alt: 'Task overdue status icon',
    class: 'overdue',
  }, taskOverDueBox);
  if (status === '2') {
    taskOverDueIcon.classList.add('shown');
  }

  const taskDueDateBox = createElementWithAttributes('div', { class: 'task-due-date' }, taskHeadBoxTwo);

  const taskDueDateText = createElementWithAttributes('span', { class: '' }, taskDueDateBox);
  taskDueDateText.textContent = `${dueDate}`;

  const taskEditIcon = createElementWithAttributes('button', {
    class: 'edit',
  }, taskHeadBoxTwo);
  taskEditIcon.ariaLabel = `Edit task ${title}, project - ${projectName}`;
  taskEditIcon.style.backgroundImage = `url(${assets.taskEditIconPath})`;
  taskEditIcon.setAttribute('data-task-action', ACTIONS_TASKS.EDIT);

  const taskRemoveIcon = createElementWithAttributes('button', {
    class: 'remove',
  }, taskHeadBoxTwo);
  taskRemoveIcon.ariaLabel = `Remove task ${title}, project - ${projectName}`;
  taskRemoveIcon.style.backgroundImage = `url(${assets.taskRemoveIconPath})`;
  taskRemoveIcon.setAttribute('data-task-action', ACTIONS_TASKS.REMOVE);

  const taskUnfoldIcon = createElementWithAttributes('button', {
    class: 'unfold',
  }, taskHeadBoxTwo);
  taskUnfoldIcon.ariaLabel = `Unfold the task\'s details panel: task ${title}, project - ${projectName}`;
  taskUnfoldIcon.style.backgroundImage = `url(${assets.taskUnfoldIconPath})`;
  taskUnfoldIcon.setAttribute('data-task-action', ACTIONS_TASKS.UNFOLD);

  const taskUnfoldedPanel = createElementWithAttributes('div', {
    class: 'task-unfold-box',
  }, task);

  const taskProjectNameBox = createElementWithAttributes('div', {
    class: 'task-project-name-box',
  }, taskUnfoldedPanel);

  const taskProjectTitle = createElementWithAttributes('span', {
    class: 'task-project-title',
  }, taskProjectNameBox);
  taskProjectTitle.textContent = 'Project: ';

  const taskProjectName = createElementWithAttributes('span', {
    class: 'task-project-name',
  }, taskProjectNameBox);
  taskProjectName.textContent = `${projectName}`;

  const taskPriorityBox = createElementWithAttributes('div', {
    class: 'task-priority-box',
  }, taskUnfoldedPanel);

  const taskPriorityTitle = createElementWithAttributes('span', {
    class: 'task-priority-title',
  }, taskPriorityBox);
  taskPriorityTitle.textContent = 'Priority: ';

  const taskPriorityText = createElementWithAttributes('span', {
    class: 'task-priority',
  }, taskPriorityBox);
  taskPriorityText.textContent = `${convertPriorityCodeToText(priority)}`;

  const taskDescriptionBox = createElementWithAttributes('div', {
    class: 'task-description-box',
  }, taskUnfoldedPanel);

  const taskDescriptionTitle = createElementWithAttributes('span', {
    class: 'task-description-title',
  }, taskDescriptionBox);
  taskDescriptionTitle.textContent = 'Description: ';

  const taskDescription = createElementWithAttributes('span', {
    class: 'task-description',
  }, taskDescriptionBox);
  taskDescription.textContent = `${description}`;

  const taskNotesBox = createElementWithAttributes('div', {
    class: 'task-notes-box',
  }, taskUnfoldedPanel);

  const taskNotesTitle = createElementWithAttributes('span', {
    class: 'task-notes-title',
  }, taskNotesBox);
  taskNotesTitle.textContent = 'Notes: ';

  const taskNotes = createElementWithAttributes('span', {
    class: 'task-notes',
  }, taskNotesBox);
  taskNotes.textContent = `${notes}`;
}
