import { renderTask } from './dom';
import {
  ACTIONS_TASKS,
  eachIsHTMLElement,
  isNodeList,
  eachIsObject,
  eachIsValid,
  NUM_TASKS_PAGE,
  createErrorObj,
} from '../utils';
import { getTaskNodes } from './static-selectors';
import { ERR_EVENTS } from './errors-text';
import { renderGroup } from '../group/dom';

export const removeHandler = (e, application) => {
  const {
    removeMenu,
    removeConfirm,
    removeHeading,
    removeMessage,
    taskList,
    sidebar,
  } = getTaskNodes();

  if (
    !eachIsHTMLElement(removeMenu, removeConfirm, removeHeading, removeMessage)
  ) {
    throw createErrorObj(ERR_EVENTS.TASK_MENU_REMOVING);
  }
  if (!eachIsHTMLElement(taskList)) {
    throw createErrorObj(ERR_EVENTS.ACTION_REMOVING_TASKS_LIST);
  }
  if (!eachIsHTMLElement(sidebar)) {
    throw createErrorObj(ERR_EVENTS.ACTION_REMOVING_SIDEBAR);
  }

  const currentTasksPage = Number(taskList.getAttribute('current-tasks-page'));
  if (!eachIsValid(currentTasksPage)) {
    throw createErrorObj(ERR_EVENTS.ACTION_REMOVING_TASKS_LIST);
  }

  const currentGroupId = sidebar.getAttribute('current-group');
  if (!eachIsValid(currentGroupId)) {
    throw createErrorObj(ERR_EVENTS.ACTION_REMOVING_SIDEBAR);
  }

  const allTaskNodes = taskList.querySelectorAll('.task');
  if (!isNodeList(allTaskNodes)) {
    throw createErrorObj(ERR_EVENTS.ACTION_REMOVING_TASKS_NODES);
  }

  const { task } = removeMenu;
  const removedProjectId = removeMenu.getAttribute('data-project-id');
  const removedTaskId = removeMenu.getAttribute('data-task-id');
  if (
    !eachIsHTMLElement(task)
    || !eachIsValid(removedProjectId, removedTaskId)
    || removedProjectId === 'null'
    || removedTaskId === 'null'
  ) {
    throw createErrorObj(ERR_EVENTS.TASK_REMOVING);
  }

  let removeTask;
  try {
    removeTask = application.removeTask(
      removedProjectId,
      removedTaskId,
      currentTasksPage,
      allTaskNodes.length,
    );
  } catch (err) {
    throw createErrorObj([
      ERR_EVENTS.ACTION_REMOVING_TASK[0],
      err.message,
      ERR_EVENTS.ACTION_REMOVING_TASK[2],
    ]);
  }
  const { newTasksPageView } = removeTask;

  taskList.innerHTML = '';
  renderGroup(newTasksPageView, currentGroupId);

  removeMenu.task = null;
  removeMenu.setAttribute('data-project-id', null);
  removeMenu.setAttribute('data-task-id', null);
  removeMenu.setAttribute('data-task-action', null);
  removeHeading.textContent = '';
  removeMessage.textContent = '';
};

export const submitHandler = (e, application) => {
  e.preventDefault();

  const {
    menu,
    titleInput,
    dueDateInput,
    descriptionInput,
    notesInput,
    taskList,
  } = getTaskNodes();
  const priorityInputs = document.querySelectorAll(
    '.task-menu input[name="priority"]',
  );
  const action = menu.getAttribute('data-task-action');
  const projectId = menu.getAttribute('data-project-id');
  const currentTasksPage = Number(taskList.getAttribute('current-tasks-page'));

  if (!eachIsHTMLElement(menu)) {
    throw createErrorObj(ERR_EVENTS.NO_TASK_MENU_SUBMIT);
  }
  if (!eachIsHTMLElement(taskList)) {
    throw createErrorObj(ERR_EVENTS.ACTION_SUBMITTING_PROJECT_LIST_PANEL);
  }
  if (
    !eachIsHTMLElement(
      titleInput,
      dueDateInput,
      descriptionInput,
      notesInput,
    )
    || !isNodeList(priorityInputs)
  ) {
    throw createErrorObj(ERR_EVENTS.TASK_MENU_PANEL_SUBMIT);
  }
  if (!eachIsValid(action, projectId, currentTasksPage)) {
    throw createErrorObj(ERR_EVENTS.NO_PROJECT_ID_OR_ACTION);
  }

  const priorityInput = document.querySelector(
    '.task-menu input[name="priority"]:checked',
  );
  if (!eachIsValid(titleInput, dueDateInput, priorityInput)) {
    throw createErrorObj([
      'Invalid input (empty field(s))',
      "One or more of the required fields' values are empty!",
      '',
    ]);
  }

  switch (action) {
    case ACTIONS_TASKS.ADD_NEW: {
      const inputNewTask = {
        projectId,
        title: titleInput.value,
        dueDate: dueDateInput.value,
        priority: priorityInput.value,
        description: descriptionInput.value,
        notes: notesInput.value,
      };

      const addTask = application.createNewTask(inputNewTask, currentTasksPage);
      if (!addTask) {
        throw createErrorObj(ERR_EVENTS.ACTION_ADDING_TASK);
      }

      const { newTask, currentPageLength } = addTask;
      if (!eachIsObject(addTask)) {
        throw createErrorObj([
          'Invalid input (task title)',
          'A task with the this title already exists in the project!',
          '',
        ]);
      }

      if (currentPageLength < NUM_TASKS_PAGE) {
        renderTask(newTask);
      }
      break;
    }

    case ACTIONS_TASKS.EDIT: {
      const taskId = menu.getAttribute('data-task-id');

      const taskSelector = `.task[data-project-id="${projectId}"][data-task-id="${taskId}"]`;
      const editedTaskNode = document.querySelector(taskSelector);
      const projectName = document.querySelector(
        `${taskSelector} .task-project-name`,
      );

      const oldTitle = document.querySelector(`${taskSelector} .task-title`);
      const oldDueDate = document.querySelector(
        `${taskSelector} .task-due-date span`,
      );
      const oldDescription = document.querySelector(
        `${taskSelector} .task-description`,
      );
      const oldNotes = document.querySelector(`${taskSelector} .task-notes`);

      if (!eachIsValid(taskId)) {
        throw createErrorObj(ERR_EVENTS.TASK_ID_EDITING);
      }
      if (
        !eachIsHTMLElement(
          editedTaskNode,
          oldTitle,
          oldDueDate,
          oldDescription,
          oldNotes,
        )
      ) {
        throw createErrorObj(ERR_EVENTS.TASK_MENU_PANEL_EDITING);
      }

      const inputEditedTask = {
        projectName: projectName.textContent,
        projectId,
        taskId,
        title: titleInput.value,
        dueDate: dueDateInput.value,
        priority: priorityInput.value,
        description: descriptionInput.value,
        notes: notesInput.value,
      };

      const editedTask = application.editTask(inputEditedTask);
      if (!editedTask) {
        throw createErrorObj(ERR_EVENTS.ACTION_EDITING_TASK);
      }

      if (!eachIsObject(editedTask)) {
        throw createErrorObj([
          'Invalid input (task title)',
          'A task with the this title already exists in the project!',
          '',
        ]);
      }

      editedTaskNode.setAttribute(
        'data-task-priority',
        `${priorityInput.value}`,
      );

      oldTitle.textContent = titleInput.value;
      oldDueDate.textContent = dueDateInput.value;
      oldDescription.textContent = descriptionInput.value;
      oldNotes.textContent = notesInput.value;

      handleToggleOverdueIcon(editedTaskNode);
      break;
    }
    default: {
      throw createErrorObj(ERR_EVENTS.DEFAULT_ACTION);
    }
  }

  exitHandler(e);
};

export const exitHandler = (e) => {
  e.preventDefault();

  const {
    menu,
    menuCover,
    menuTitle,
    submitButton,
    titleInput,
    allPriorityInputs,
    dueDateInput,
    descriptionInput,
    notesInput,
  } = getTaskNodes();

  if (
    !eachIsHTMLElement(
      menu,
      menuCover,
      menuTitle,
      submitButton,
      titleInput,
      dueDateInput,
      descriptionInput,
      notesInput,
    )
    || !isNodeList(allPriorityInputs)
  ) {
    throw createErrorObj(ERR_EVENTS.TASK_MENU_PANEL_EXITING);
  }

  menuTitle.textContent = '';
  submitButton.textContent = '';

  menuCover.classList.remove('shown');
  menu.classList.remove('shown');
  menu.removeAttribute('data-project-action');
  menu.removeAttribute('data-project-id');
  menu.removeAttribute('data-task-action');
  menu.removeAttribute('data-task-id');

  titleInput.value = '';
  // eslint-disable-next-line no-return-assign, no-param-reassign
  allPriorityInputs.forEach((input) => (input.checked = false));
  dueDateInput.value = '';
  descriptionInput.value = '';
  notesInput.value = '';
};

export const handleToggleOverdueIcon = (task) => {
  const icon = task.querySelector('img.overdue');
  const newStatus = task.getAttribute('data-task-status');
  if (newStatus === '2') {
    icon.classList.add('shown');
  } else {
    icon.classList.remove('shown');
  }
};
