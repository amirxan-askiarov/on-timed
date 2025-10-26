import { renderTask } from './dom';
import {
  ACTIONS_TASKS,
  isHTMLElement,
  isNodeList,
  isObject,
  isValid,
  showErrorModal,
  NUM_TASKS_PAGE,
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

  if (!isHTMLElement(removeMenu)
      || !isHTMLElement(removeConfirm)
      || !isHTMLElement(removeHeading)
      || !isHTMLElement(removeMessage)
  ) {
    showErrorModal(ERR_EVENTS.TASK_MENU_REMOVING);
    return;
  }
  if (!isHTMLElement(taskList)) {
    showErrorModal(ERR_EVENTS.ACTION_REMOVING_TASKS_LIST);
    return;
  }
  if (!isHTMLElement(sidebar)) {
    showErrorModal(ERR_EVENTS.ACTION_REMOVING_SIDEBAR);
    return;
  }

  const currentTasksPage = Number(taskList.getAttribute('current-tasks-page'));
  if (!isValid(currentTasksPage)) {
    showErrorModal(ERR_EVENTS.ACTION_REMOVING_TASKS_LIST);
    return;
  }

  const currentGroupId = sidebar.getAttribute('current-group');
  if (!isValid(currentGroupId)) {
    showErrorModal(ERR_EVENTS.ACTION_REMOVING_SIDEBAR);
    return;
  }

  const allTaskNodes = taskList.querySelectorAll('.task');
  if (!isNodeList(allTaskNodes)) {
    showErrorModal(ERR_EVENTS.ACTION_REMOVING_TASKS_NODES);
    return;
  }

  const { task } = removeMenu;
  const removedProjectId = removeMenu.getAttribute('data-project-id');
  const removedTaskId = removeMenu.getAttribute('data-task-id');
  if (!isHTMLElement(task)
      || !isValid(removedProjectId)
      || !isValid(removedTaskId)
      || removedProjectId === 'null'
      || removedTaskId === 'null'
  ) {
    showErrorModal(ERR_EVENTS.TASK_REMOVING);
    return;
  }

  let removeTask;
  try {
    removeTask = application
      .removeTask(removedProjectId, removedTaskId, currentTasksPage, allTaskNodes.length);
  } catch (err) {
    showErrorModal(
      [ERR_EVENTS.ACTION_REMOVING_TASK[0],
        err.message,
        ERR_EVENTS.ACTION_REMOVING_TASK[2]],
    );
    return;
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
  const priorityInputs = document.querySelectorAll('.task-menu input[name="priority"]');
  const action = menu.getAttribute('data-task-action');
  const projectId = menu.getAttribute('data-project-id');
  const currentTasksPage = Number(taskList.getAttribute('current-tasks-page'));

  if (!isHTMLElement(menu)) {
    showErrorModal(ERR_EVENTS.NO_TASK_MENU_SUBMIT);
  }
  if (!isHTMLElement(taskList)) {
    showErrorModal(ERR_EVENTS.ACTION_SUBMITTING_PROJECT_LIST_PANEL);
    return;
  }
  if (!isHTMLElement(titleInput)
      || !isHTMLElement(dueDateInput)
      || !isHTMLElement(descriptionInput)
      || !isHTMLElement(notesInput)
      || !isNodeList(priorityInputs)
  ) {
    showErrorModal(ERR_EVENTS.TASK_MENU_PANEL_SUBMIT);
  }
  if (!isValid(action) || !isValid(projectId) || !isValid(currentTasksPage)) {
    showErrorModal(ERR_EVENTS.NO_PROJECT_ID_OR_ACTION);
    return;
  }

  const priorityInput = document.querySelector('.task-menu input[name="priority"]:checked');
  if (!isValid(titleInput)
      || !isValid(dueDateInput)
      || !isValid(priorityInput)
  ) {
    showErrorModal(['Invalid input (empty field(s))', 'One or more of the required fields\' values are empty!', '']);
    return;
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

      let addTask;
      try {
        addTask = application.createNewTask(inputNewTask, currentTasksPage);
      } catch (err) {
        showErrorModal(
          [ERR_EVENTS.ACTION_ADDING_TASK[0],
            err.message,
            ERR_EVENTS.ACTION_ADDING_TASK[2]],
        );
        return;
      }
      const { newTask, currentPageLength } = addTask;
      if (!isObject(addTask)) {
        showErrorModal(['Invalid input (task title)', 'A task with the this title already exists in the project!', '']);
        return;
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
      const projectName = document.querySelector(`${taskSelector} .task-project-name`);

      const oldTitle = document.querySelector(`${taskSelector} .task-title`);
      const oldDueDate = document.querySelector(`${taskSelector} .task-due-date span`);
      const oldDescription = document.querySelector(`${taskSelector} .task-description`);
      const oldNotes = document.querySelector(`${taskSelector} .task-notes`);

      if (!isValid(taskId)) {
        showErrorModal(ERR_EVENTS.TASK_ID_EDITING);
        return;
      }
      if (!isHTMLElement(editedTaskNode)
                || !isHTMLElement(oldTitle)
                || !isHTMLElement(oldDueDate)
                || !isHTMLElement(oldDescription)
                || !isHTMLElement(oldNotes)) {
        showErrorModal(ERR_EVENTS.TASK_MENU_PANEL_EDITING);
        return;
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

      let editedTask;
      try {
        editedTask = application.editTask(inputEditedTask);
      } catch (err) {
        showErrorModal(
          [ERR_EVENTS.ACTION_EDITING_TASK[0],
            err.message,
            ERR_EVENTS.ACTION_EDITING_TASK[2]],
        );
        return;
      }
      if (!isObject(editedTask)) {
        showErrorModal(
          ['Invalid input (task title)',
            'A task with the this title already exists in the project!', ''],
        );
        return;
      }

      editedTaskNode.setAttribute('data-task-priority', `${priorityInput.value}`);

      oldTitle.textContent = titleInput.value;
      oldDueDate.textContent = dueDateInput.value;
      oldDescription.textContent = descriptionInput.value;
      oldNotes.textContent = notesInput.value;

      handleToggleOverdueIcon(editedTaskNode);
      break;
    }
    default: {
      showErrorModal(ERR_EVENTS.DEFAULT_ACTION);
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

  if (!isHTMLElement(menu)
      || !isHTMLElement(menuCover)
      || !isHTMLElement(menuTitle)
      || !isHTMLElement(submitButton)
      || !isHTMLElement(titleInput)
      || !isNodeList(allPriorityInputs)
      || !isHTMLElement(dueDateInput)
      || !isHTMLElement(descriptionInput)
      || !isHTMLElement(notesInput)
  ) {
    showErrorModal(ERR_EVENTS.TASK_MENU_PANEL_EXITING);
    return;
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
  allPriorityInputs.forEach((input) => input.checked = false);
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
