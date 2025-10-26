import { renderProject } from './dom';
import { renderGroup } from '../group/dom';
import { getProjectNodes } from './static-selectors';
import {
  showErrorModal,
  ACTIONS_PROJECTS,
  isHTMLElement,
  isValid,
  isObject,
  isNodeList,
  NUM_PROJECTS_PAGE,
  DEFAULT_GROUP,
} from '../utils';
import { ERR_EVENTS } from './errors-text';

export const removeHandler = (e, application) => {
  const {
    currentGroupIcon,
    currentGroupName,
    removeMenu,
    removeHeading,
    removeMessage,
    sidebar,
    tasksList,
  } = getProjectNodes();

  if (!isHTMLElement(removeMenu)
      || !isHTMLElement(removeHeading)
      || !isHTMLElement(removeMessage)
      || !isHTMLElement(currentGroupIcon)
      || !isHTMLElement(currentGroupName)
  ) {
    showErrorModal(ERR_EVENTS.REMOVE_MENU_NODES);
    return;
  }
  if (!isHTMLElement(sidebar)
      || !isHTMLElement(tasksList)) {
    showErrorModal(ERR_EVENTS.ACTION_REMOVING_NO_SIDEBAR);
    return;
  }

  const removedProject = removeMenu.project;
  const removedProjectId = removeMenu.getAttribute('data-project-id');
  if (!isHTMLElement(removedProject) || !isValid(removedProjectId) || removedProjectId === 'null') {
    showErrorModal(ERR_EVENTS.REMOVE_MENU_PROJECTS);
    return;
  }

  const { projectsList } = getProjectNodes();
  const allProjectNodes = projectsList.querySelectorAll('.project');
  if (!isHTMLElement(projectsList)
      || !isNodeList(allProjectNodes)
  ) {
    showErrorModal(ERR_EVENTS.ACTION_REMOVING_PROJECT_LIST_PANEL);
    return;
  }

  const currentProjectsPageNumber = parseInt(projectsList.getAttribute('current-projects-page'), 10);
  let currentGroupId = sidebar.getAttribute('current-group');
  if (!isValid(currentProjectsPageNumber)
      || !isValid(currentGroupId)
  ) {
    showErrorModal(ERR_EVENTS.ACTION_REMOVING_PROJECTS_NAV);
    return;
  }
  if (removedProject.getAttribute('data-group-id') === currentGroupId) {
    currentGroupId = DEFAULT_GROUP;
  }

  let newProjectView;
  try {
    newProjectView = application
      .removeProject(
        removedProjectId,
        currentProjectsPageNumber,
        allProjectNodes.length,
        currentGroupId,
      );
  } catch (err) {
    showErrorModal(
      [ERR_EVENTS.ACTION_REMOVING_PROJECT[0], err.message, ERR_EVENTS.ACTION_REMOVING_PROJECT[2]],
    );
    return;
  }
  const { newTasksPageView, newProjectsPageView } = newProjectView;

  projectsList.innerHTML = '';
  newProjectsPageView.forEach((project) => renderProject(project));

  const currentGroup = document.querySelector(`.project[data-group-id='${currentGroupId}'], .bar-types > button[data-group-id='${currentGroupId}']`);
  if (currentGroup) {
    currentGroup.classList.add('current');
    currentGroupName.textContent = currentGroup.querySelector('span').textContent;
    currentGroupIcon.src = currentGroup.querySelector('img').src;
    currentGroupIcon.alt = currentGroup.querySelector('img').alt;
  }

  tasksList.innerHTML = '';
  renderGroup(newTasksPageView, currentGroupId);

  sidebar.setAttribute('current-group', currentGroupId);
  removeMenu.project = null;
  removeMenu.setAttribute('data-project-id', null);
  removeMenu.setAttribute('data-project-action', null);
  removeHeading.textContent = '';
  removeMessage.textContent = '';
};

export const submitHandler = (e, application) => {
  e.preventDefault();
  e.stopImmediatePropagation();

  const { menu } = getProjectNodes();
  if (!isHTMLElement(menu)) {
    showErrorModal(ERR_EVENTS.SUBMIT_NO_PROJECT_MENU);
    return;
  }

  const action = menu.getAttribute('data-project-action');
  submitForm(e, action, application);
};

export const exitHandler = (e) => {
  e.preventDefault();
  const {
    menuCover,
    menu,
    menuTitle,
    submitButton,
    inputsAllOptions,
    inputProjectName,
  } = getProjectNodes();

  if (!isHTMLElement(menu)
      || !isHTMLElement(menuCover)
      || !isHTMLElement(menuTitle)
      || !isHTMLElement(submitButton)
      || !isNodeList(inputsAllOptions)
      || !isHTMLElement(inputProjectName)
  ) {
    showErrorModal(ERR_EVENTS.EXITING_PROJECT_MENU_RENDERING);
    return;
  }

  const selectedOption = menu.querySelector('.project-options .selected');

  menuTitle.textContent = '';
  submitButton.textContent = '';
  inputProjectName.value = '';
  inputsAllOptions.forEach((input) => {
    // eslint-disable-next-line no-param-reassign
    input.checked = false;
  });

  if (isHTMLElement(selectedOption)) {
    selectedOption.classList.remove('selected');
  }
  menuCover.classList.remove('shown');
  menu.classList.remove('shown');

  menu.setAttribute('data-project-action', null);
  menu.setAttribute('data-group-id', null);
  menu.setAttribute('data-task-action', null);
  menu.setAttribute('data-task-id', null);
};

const submitForm = (e, action, application) => {
  const inputName = document.querySelector('#project-name');
  const inputIcon = document.querySelector('.project-menu input[name="iconURL"]:checked');

  if (!isValid(inputName.value)) {
    showErrorModal(['Invalid input (project name)', 'Please provide a new project\'s name', '']);
    return;
  }
  if (!isHTMLElement(inputIcon)
      || !isValid(inputIcon.value)
      || !isValid(inputIcon.dataset.altText)) {
    showErrorModal(['Invalid input (project icon)', 'Please select an icon', '']);
    return;
  }

  switch (action) {
    case ACTIONS_PROJECTS.ADD_NEW: {
      const inputNewProject = {
        name: inputName.value,
        iconURL: inputIcon.value,
        altText: inputIcon.dataset.altText,
      };

      const { projectsList } = getProjectNodes();
      if (!isHTMLElement(projectsList)) {
        showErrorModal(ERR_EVENTS.ACTION_SUBMITTING_PROJECT_LIST_PANEL);
        return;
      }

      const currentProjectsPageNumber = parseInt(projectsList.getAttribute('current-projects-page'), 10);
      if (!isValid(currentProjectsPageNumber)) {
        showErrorModal(ERR_EVENTS.ACTION_ADDING_PROJECTS_NAV);
        return;
      }

      let addProject;
      try {
        addProject = application.createNewProject(inputNewProject, currentProjectsPageNumber);
      } catch (err) {
        showErrorModal(
          [ERR_EVENTS.ACTION_SUBMITTING_PROJECT[0],
            err.message,
            ERR_EVENTS.ACTION_SUBMITTING_PROJECT[2]],
        );
        return;
      }
      const { newProject, currentPageLength } = addProject;
      if (!isObject(newProject)) {
        showErrorModal(['Invalid input (project name)', 'A project with the new name already exists!', '']);
        return;
      }

      if (currentPageLength < NUM_PROJECTS_PAGE) {
        renderProject(newProject);
      }

      exitHandler(e);
      break;
    }

    case ACTIONS_PROJECTS.EDIT: {
      const { menu } = getProjectNodes();
      const id = menu.getAttribute('data-group-id');

      if (!menu) {
        showErrorModal(ERR_EVENTS.SUBMIT_PROJECT_MENU_SHOWING);
        return;
      }
      if (!id) {
        showErrorModal(ERR_EVENTS.SUBMIT_GROUP_ID);
        return;
      }

      const inputEditProject = {
        id,
        name: inputName.value,
        iconURL: inputIcon.value,
        altText: inputIcon.dataset.altText,
      };

      let editedProject;
      try {
        editedProject = application.editProject(inputEditProject);
      } catch (err) {
        showErrorModal(
          [ERR_EVENTS.ACTION_SUBMITTING_PROJECT[0],
            err.message,
            ERR_EVENTS.ACTION_SUBMITTING_PROJECT[2]],
        );
        return;
      }
      if (!isObject(editedProject)) {
        showErrorModal(['Invalid input (project name)', 'A project with the new name already exists!', '']);
        return;
      }

      updateEditedProjectNode(editedProject);
      exitHandler(e);
      break;
    }
    default:
      showErrorModal(ERR_EVENTS.SHOWING_DEFAULT_ACTION);
  }
};

const updateEditedProjectNode = (project) => {
  const { currentGroupIcon, currentGroupName } = getProjectNodes();
  const {
    id, name, iconURL, altText,
  } = project;
  const editedProjectNodeName = document.querySelector(`.project[data-group-id="${id}"] span`);
  const editedProjectNodeIcon = document.querySelector(`.project[data-group-id="${id}"] img`);
  const editedProjectNode = document.querySelector(`.project[data-group-id="${id}"]`);
  const editedProjectTaskNodes = document.querySelectorAll(`.task[data-project-id="${id}"]`);

  if (!isHTMLElement(currentGroupIcon)
      || !isHTMLElement(currentGroupName)
      || !isHTMLElement(editedProjectNodeName)
      || !isHTMLElement(editedProjectNodeIcon)
      || !isHTMLElement(editedProjectNode)
  ) {
    showErrorModal(ERR_EVENTS.EDITED_PROJECT_NODES);
    return;
  }
  if (!isValid(id) || !isValid(name) || !isValid(iconURL) || !isValid(altText)) {
    showErrorModal(ERR_EVENTS.EDITED_DATA_VALUES);
    return;
  }

  editedProjectNodeName.textContent = name;
  editedProjectNodeIcon.src = iconURL;
  editedProjectNodeIcon.alt = altText;

  if (editedProjectNode.classList.contains('current')) {
    currentGroupName.textContent = name;
    currentGroupIcon.src = iconURL;
    currentGroupIcon.alt = altText;
  }

  if (editedProjectTaskNodes) {
    editedProjectTaskNodes.forEach((taskNode) => {
      const projectNameNode = taskNode.querySelector('.task-project-name');
      projectNameNode.textContent = name;
    });
  }
};
