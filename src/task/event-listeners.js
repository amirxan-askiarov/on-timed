import _ from 'lodash';
import {
  ACTIONS_TASKS,
  isHTMLElement,
  isNodeList,
  isValid,
  showErrorModal,
  handleExitRemoveMenu,
  isPressedKey,
  isReal,
  KEYPRESS_THROTTLE_TIME,
  SUBMIT_THROTTLE_TIME,
} from '../utils';
import { getTaskNodes } from './static-selectors';
import { ERR_EVENTS } from './errors-text';
import { assets } from './assets';
import {
  removeHandler, exitHandler, submitHandler, handleToggleOverdueIcon,
} from './handlers';

export function addListenersManageTasks(application) {
  const {
    main, form, exitButton, cancelButton, removeConfirm, removeMenu,
  } = getTaskNodes();
  if (!isHTMLElement(main)
    || !isHTMLElement(form)
    || !isHTMLElement(exitButton)
    || !isHTMLElement(cancelButton)
    || !isHTMLElement(removeMenu)
    || !isHTMLElement(removeConfirm)
  ) {
    showErrorModal(ERR_EVENTS.TASK_MENU_RENDERING);
    return;
  }

  const handleTaskActionThrottle = _
    .throttle((e, app) => handleTaskAction(e, app), KEYPRESS_THROTTLE_TIME);
  function handleTaskAction(e, app) {
    if (isPressedKey(e)) {
      const reactiveTaskIcon = e.target.closest('.task button, .task-bar .add-new');
      if (isHTMLElement(reactiveTaskIcon)) {
        const action = reactiveTaskIcon.getAttribute('data-task-action');

        if (!isValid(action)) {
          return;
        }
        if (!Object.values(ACTIONS_TASKS).includes(action)) {
          showErrorModal(ERR_EVENTS.DEFAULT_ACTION);
          return;
        }

        taskAction(action, reactiveTaskIcon, app);
      }
    }
  }
  main.addEventListener('click', (e) => handleTaskActionThrottle(e, application));

  const handleLabelSelectionThrottle = _
    .throttle((ev, applic) => handleLabelSelection(ev, applic), KEYPRESS_THROTTLE_TIME);
  function handleLabelSelection(event, app) {
    if (isPressedKey(event)) {
      const reactiveTaskIcon = event.target.closest('.task label');
      if (isHTMLElement(reactiveTaskIcon)) {
        const action = reactiveTaskIcon.getAttribute('data-task-action');
        if (!isValid(action)) {
          return;
        }

        taskAction(action, reactiveTaskIcon, app);
      }
    }
  }
  main.addEventListener('click', (e) => handleLabelSelectionThrottle(e, application));
  main.addEventListener('keydown', (e) => handleLabelSelectionThrottle(e, application));

  const submitHandlerThrottle = _
    .throttle((event, app) => submitHandler(event, app), SUBMIT_THROTTLE_TIME);
  form.addEventListener('submit', (e) => submitHandlerThrottle(e, application));

  const removeHandlerThrottle = _.throttle((event, app) => {
    if (isPressedKey(event)) {
      const taskAction = removeMenu.getAttribute('data-task-action');
      if (taskAction && taskAction !== 'null') {
        removeHandler(event, app);
        handleExitRemoveMenu(event);
      }
    }
  }, SUBMIT_THROTTLE_TIME);
  removeConfirm.addEventListener('click', (e) => removeHandlerThrottle(e, application));

  const exitHandlerThrottle = _.throttle((event) => {
    if (isPressedKey(event)) {
      exitHandler(event);
    }
  }, SUBMIT_THROTTLE_TIME);
  exitButton.addEventListener('click', (e) => exitHandlerThrottle(e));
  cancelButton.addEventListener('click', (e) => exitHandlerThrottle(e));
}

const taskAction = (action, target, application) => {
  const {
    menu,
    menuCover,
    menuTitle,
    submitButton,
    removeMenu,
    removeHeading,
    removeMessage,
  } = getTaskNodes();

  if (!isHTMLElement(menu)
    || !isHTMLElement(menuCover)
    || !isHTMLElement(menuTitle)
    || !isHTMLElement(submitButton)
    || !isHTMLElement(removeMenu)
    || !isHTMLElement(removeHeading)
    || !isHTMLElement(removeMessage)
  ) {
    showErrorModal(ERR_EVENTS.TASK_MENU_SHOWING);
    return;
  }

  const task = target.closest('.task');
  let projectId;
  let taskId;

  if (isHTMLElement(task)) {
    projectId = task.getAttribute('data-project-id');
    taskId = task.getAttribute('data-task-id');
  }

  switch (action) {
    case ACTIONS_TASKS.ADD_NEW: {
      const currentProject = document.querySelector('.projects-list .project.current');
      const id = currentProject.getAttribute('data-group-id');
      if (!isHTMLElement(currentProject) || !isValid(id)) {
        showErrorModal(ERR_EVENTS.TASK_MENU_ADD);
        return;
      }

      menu.setAttribute('data-project-id', `${id}`);
      menu.setAttribute('data-task-action', 'add-new');

      menuTitle.textContent = 'Add a new task';
      submitButton.textContent = 'Add';
      menuCover.classList.add('shown');
      menu.classList.add('shown');
      break;
    }

    case ACTIONS_TASKS.UPDATE_STATUS: {
      if (!isHTMLElement(task) || !isValid(projectId) || !isValid(taskId)) {
        showErrorModal(ERR_EVENTS.NO_TASK_OR_IDS_UPDATE);
        return;
      }

      const svg = target.closest('.task').querySelector('label svg');
      const path = target.closest('.task').querySelector('label svg path');
      if (!isHTMLElement(svg) || !isHTMLElement(path)) {
        showErrorModal(ERR_EVENTS.NO_TOGGLE_ICON);
        return;
      }

      const currentTaskStatus = task.getAttribute('data-task-status');
      let updatedTaskStatus;
      try {
        updatedTaskStatus = application.toggleTaskStatus(projectId, taskId);
      } catch (err) {
        showErrorModal(
          [ERR_EVENTS.ACTION_UPDATE_STATUS[0], err.message, ERR_EVENTS.ACTION_UPDATE_STATUS[2]],
        );
        return;
      }

      if (currentTaskStatus === updatedTaskStatus) {
        showErrorModal(ERR_EVENTS.ACTION_UPDATE_STATUS_INVALID);
        return;
      }
      task.setAttribute('data-task-status', updatedTaskStatus);
      handleToggleOverdueIcon(task);
      break;
    }

    case ACTIONS_TASKS.EDIT: {
      if (!isHTMLElement(task) || !isValid(projectId) || !isValid(taskId)) {
        showErrorModal(ERR_EVENTS.NO_TASK_OR_IDS_EDIT_SHOWING);
        return;
      }

      const {
        titleInput,
        allPriorityInputs,
        dueDateInput,
        descriptionInput,
        notesInput,
      } = getTaskNodes();

      if (!isHTMLElement(titleInput)
                || !isNodeList(allPriorityInputs)
                || !isHTMLElement(dueDateInput)
                || !isHTMLElement(descriptionInput)
                || !isHTMLElement(notesInput)
      ) {
        showErrorModal(ERR_EVENTS.NO_TASK_OR_IDS_EDIT_SHOWING);
        return;
      }

      const tasksTitle = task.querySelector('.task .task-title').textContent;
      const tasksPriorityCode = task.getAttribute('data-task-priority');
      const tasksDueDate = task.querySelector('.task .task-due-date span').textContent;
      const tasksDescription = task.querySelector('.task .task-description').textContent;
      const tasksNotes = task.querySelector('.task .task-notes').textContent;

      if (!isReal(tasksTitle)
                || !isReal(tasksPriorityCode)
                || !isReal(tasksDueDate)
                || !isReal(tasksDescription)
                || !isReal(tasksNotes)
      ) {
        showErrorModal(ERR_EVENTS.NO_TASK_OR_IDS_EDIT_SHOWING);
        return;
      }

      let selectedInput;
      for (const input of allPriorityInputs) {
        if (input.value === tasksPriorityCode) {
          selectedInput = input;
          break;
        }
      }
      if (!selectedInput) {
        showErrorModal(ERR_EVENTS.EDITED_TASK_PRIORITY_VALUE);
        return;
      }

      selectedInput.checked = true;
      titleInput.value = tasksTitle;
      dueDateInput.value = tasksDueDate;
      descriptionInput.value = tasksDescription;
      notesInput.value = tasksNotes;

      menu.setAttribute('data-project-id', `${projectId}`);
      menu.setAttribute('data-task-action', 'edit');
      menu.setAttribute('data-task-id', `${taskId}`);

      menuTitle.textContent = 'Edit the task';
      submitButton.textContent = 'Save';
      menuCover.classList.add('shown');
      menu.classList.add('shown');
      break;
    }

    case ACTIONS_TASKS.REMOVE: {
      if (!isHTMLElement(task) || !isValid(projectId) || !isValid(taskId)) {
        showErrorModal(ERR_EVENTS.NO_TASK_OR_IDS_REMOVE);
        return;
      }

      removeMenu.task = task;
      removeMenu.setAttribute('data-project-id', projectId);
      removeMenu.setAttribute('data-task-id', taskId);
      removeMenu.setAttribute('data-task-action', action);

      menuCover.classList.add('shown');
      removeMenu.classList.add('shown');
      removeHeading.textContent = 'Remove the task';
      removeMessage.textContent = 'Are you sure you want to delete the task?';
      break;
    }

    case ACTIONS_TASKS.UNFOLD: {
      const unfoldedTaskPanel = target.closest('.task');
      const taskInfoPanel = unfoldedTaskPanel.querySelector('.task-unfold-box');

      if (!isHTMLElement(unfoldedTaskPanel) || !isHTMLElement(taskInfoPanel)) {
        showErrorModal(ERR_EVENTS.TASK_UNFOLD_NODES);
        return;
      }

      if (!unfoldedTaskPanel.classList.contains('unfolded')) {
        unfoldedTaskPanel.classList.add('unfolded');
        taskInfoPanel.classList.add('shown');

        unfoldedTaskPanel.querySelector('.unfold').ariaLabel = 'Fold the task\'s details panel';
        // eslint-disable-next-line no-param-reassign
        target.style.backgroundImage = `url(${assets.taskFoldIconPath})`;
      } else {
        unfoldedTaskPanel.classList.remove('unfolded');
        taskInfoPanel.classList.remove('shown');

        unfoldedTaskPanel.querySelector('.unfold').ariaLabel = 'Unfold the task\'s details panel';
        // eslint-disable-next-line no-param-reassign
        target.style.backgroundImage = `url(${assets.taskUnfoldIconPath})`;
      }
      break;
    }
    default: {
      showErrorModal(ERR_EVENTS.DEFAULT_ACTION);
    }
  }
};
