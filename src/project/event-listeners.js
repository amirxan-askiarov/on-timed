/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { getProjectNodes } from './static-selectors';
import {
  showErrorModal,
  ACTIONS_PROJECTS,
  isHTMLElement,
  isValid,
  handleExitRemoveMenu,
  isNodeList,
  isPressedKey,
  KEYPRESS_THROTTLE_TIME,
  SUBMIT_THROTTLE_TIME,
} from '../utils';
import { ERR_EVENTS } from './errors-text';
import {
  removeHandler, submitHandler, exitHandler,
} from './handlers';

export function addListenersManageProjects(application) {
  const {
    projectsBar,
    form,
    exitButton,
    cancelButton,
    removeMenu,
    removeConfirm,
    optionsIconsContainer,
    allOptions,
  } = getProjectNodes();

  if (!isHTMLElement(projectsBar)
    || !isHTMLElement(form)
    || !isHTMLElement(removeMenu)
    || !isHTMLElement(removeConfirm)
    || !isHTMLElement(exitButton)
    || !isHTMLElement(cancelButton)
    || !isHTMLElement(optionsIconsContainer)
    || !isNodeList(allOptions)
  ) {
    showErrorModal(ERR_EVENTS.APPLY_EVENTS_PROJECT_MENU_RENDERING);
    return;
  }

  const handleProjectIconSelectionThrottle = _
    .throttle((event) => handleProjectIconSelection(event), KEYPRESS_THROTTLE_TIME);
  function handleProjectIconSelection(event) {
    if (isPressedKey(event)
          && event.target.tagName === 'DIV'
          && event.target.classList.contains('project-icon-option')
    ) {
      allOptions.forEach((optionNode) => optionNode.classList.remove('selected'));

      const inputSelected = event.target.querySelector('input');
      inputSelected.checked = true;
      event.target.classList.add('selected');
    }
  }
  optionsIconsContainer.addEventListener('click', (e) => handleProjectIconSelectionThrottle(e));
  optionsIconsContainer.addEventListener('keydown', (e) => handleProjectIconSelectionThrottle(e));

  const openMenuThrottle = _.throttle((e) => openMenu(e), SUBMIT_THROTTLE_TIME);
  const openMenu = (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    openMenuHandler(e);
  };
  projectsBar.addEventListener('click', (e) => openMenuThrottle(e));
  projectsBar.addEventListener('keydown', (e) => openMenuThrottle(e));

  const submitHandlerThrottle = _
    .throttle((e, app) => submitHandler(e, app), SUBMIT_THROTTLE_TIME);
  form.addEventListener('submit', (e) => submitHandlerThrottle(e, application));

  const handleProjectRemoveThrottle = _
    .throttle((e, app) => handleProjectRemove(e, app), SUBMIT_THROTTLE_TIME);
  function handleProjectRemove(e, app) {
    if (isPressedKey(e)) {
      if (!isHTMLElement(removeMenu)) {
        showErrorModal(ERR_EVENTS.APPLY_EVENTS_PROJECT_MENU_RENDERING);
        return;
      }

      const projectAction = removeMenu.getAttribute('data-project-action');
      if (projectAction && projectAction !== 'null') {
        removeHandler(e, app);
        handleExitRemoveMenu(e);
      }
    }
  }
  removeConfirm.addEventListener('click', (e) => handleProjectRemoveThrottle(e, application));

  const exitThrottle = _.throttle((e) => {
    if (isPressedKey(e)) {
      exitHandler(e);
    }
  }, SUBMIT_THROTTLE_TIME);
  exitButton.addEventListener('click', (e) => exitThrottle(e));
  cancelButton.addEventListener('click', (e) => exitThrottle(e));
}

const openMenuHandler = (e) => {
  if (isPressedKey(e) && e.target.tagName === 'BUTTON') {
    e.preventDefault();
    e.stopImmediatePropagation();

    const action = e.target.getAttribute('data-project-action');
    if (!isValid(action)) {
      return;
    }

    openMenu(action, e.target);
  }
};

const openMenu = (action, target) => {
  const {
    menuCover,
    menu,
    menuTitle,
    submitButton,
    removeMenu,
    removeHeading,
    removeMessage,
    inputsAllOptions,
    inputProjectName,
  } = getProjectNodes();

  if (!isHTMLElement(menu)
    || !isHTMLElement(menuCover)
    || !isHTMLElement(menuTitle)
    || !isHTMLElement(submitButton)
    || !isHTMLElement(removeMenu)
    || !isHTMLElement(removeHeading)
    || !isHTMLElement(removeMessage)
    || !isHTMLElement(inputProjectName)
    || !isNodeList(inputsAllOptions)
  ) {
    showErrorModal(ERR_EVENTS.PROJECT_MENU_SHOWING);
    return;
  }

  switch (action) {
    case ACTIONS_PROJECTS.ADD_NEW: {
      menu.setAttribute('data-project-action', action);
      menuCover.classList.add('shown');
      menu.classList.add('shown');
      menuTitle.textContent = 'Add a new project';
      submitButton.textContent = 'Add';
      break;
    }

    case ACTIONS_PROJECTS.EDIT: {
      const editedProject = target.closest('.project');
      const editedProjectId = editedProject.getAttribute('data-group-id');

      if (!isHTMLElement(editedProject) || !isValid(editedProjectId)) {
        showErrorModal(ERR_EVENTS.EDITED_PROJECT);
        return;
      }

      const projectsName = editedProject.querySelector('span').textContent;
      const projectsIconURL = editedProject.querySelector('img').getAttribute('src');
      if (!projectsName || !projectsIconURL) {
        showErrorModal(ERR_EVENTS.EDITED_PROJECT_VALUES);
        return;
      }

      let selectedInput;
      for (const input of inputsAllOptions) {
        if (input.value === projectsIconURL) {
          selectedInput = input;
          break;
        }
      }
      const div = selectedInput.closest('.project-icon-option');
      if (!selectedInput || !isHTMLElement(div)) {
        showErrorModal(ERR_EVENTS.EDITED_PROJECT_URL);
        return;
      }

      div.classList.add('selected');
      inputProjectName.value = projectsName;
      selectedInput.checked = true;

      menu.setAttribute('data-project-action', action);
      menu.setAttribute('data-group-id', editedProjectId);
      menuCover.classList.add('shown');
      menu.classList.add('shown');

      menuTitle.textContent = 'Edit the project';
      submitButton.textContent = 'Save';
      break;
    }

    case ACTIONS_PROJECTS.REMOVE: {
      const { currentGroupIcon, currentGroupName } = getProjectNodes();
      const project = target.closest('.project');
      const projectId = project.getAttribute('data-group-id');

      if (!isHTMLElement(currentGroupIcon) || !isHTMLElement(currentGroupName)) {
        showErrorModal(ERR_EVENTS.REMOVED_PROJECT_NODES);
        return;
      }
      if (!isHTMLElement(project) || !isValid(projectId)) {
        showErrorModal(ERR_EVENTS.REMOVED_PROJECT);
        return;
      }

      removeMenu.project = project;
      removeMenu.setAttribute('data-project-id', projectId);
      removeMenu.setAttribute('data-project-action', action);

      menuCover.classList.add('shown');
      removeMenu.classList.add('shown');
      removeHeading.textContent = 'Remove the project';
      removeMessage.textContent = 'Are you sure you want to delete the project? All tasks of the project will be removed!';
      break;
    }

    default:
      showErrorModal(ERR_EVENTS.SHOWING_DEFAULT_ACTION);
  }
};
