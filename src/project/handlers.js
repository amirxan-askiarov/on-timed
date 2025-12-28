import { renderProject } from './dom';
import { renderGroup } from '../group/dom';
import { getProjectNodes } from './static-selectors';
import {
  ACTIONS_PROJECTS,
  eachIsHTMLElement,
  eachIsValid,
  eachIsObject,
  isNodeList,
  NUM_PROJECTS_PAGE,
  DEFAULT_GROUP,
  createErrorObj,
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

  if (
    !eachIsHTMLElement(
      removeMenu,
      removeHeading,
      removeMessage,
      currentGroupIcon,
      currentGroupName,
    )
  ) {
    throw createErrorObj(ERR_EVENTS.REMOVE_MENU_NODES);
  }
  if (!eachIsHTMLElement(sidebar, tasksList)) {
    throw createErrorObj(ERR_EVENTS.ACTION_REMOVING_NO_SIDEBAR);
  }

  const removedProject = removeMenu.project;
  const removedProjectId = removeMenu.getAttribute('data-project-id');
  if (
    !eachIsHTMLElement(removedProject)
    || !eachIsValid(removedProjectId)
    || removedProjectId === 'null'
  ) {
    throw createErrorObj(ERR_EVENTS.REMOVE_MENU_PROJECTS);
  }

  const { projectsList } = getProjectNodes();
  const allProjectNodes = projectsList.querySelectorAll('.project');
  if (!eachIsHTMLElement(projectsList) || !isNodeList(allProjectNodes)) {
    throw createErrorObj(ERR_EVENTS.ACTION_REMOVING_PROJECT_LIST_PANEL);
  }

  const currentProjectsPageNumber = parseInt(
    projectsList.getAttribute('current-projects-page'),
    10,
  );
  let currentGroupId = sidebar.getAttribute('current-group');
  if (!eachIsValid(currentProjectsPageNumber, currentGroupId)) {
    throw createErrorObj(ERR_EVENTS.ACTION_REMOVING_PROJECTS_NAV);
  }
  if (removedProject.getAttribute('data-group-id') === currentGroupId) {
    currentGroupId = DEFAULT_GROUP;
  }

  const newProjectView = application.removeProject(
    removedProjectId,
    currentProjectsPageNumber,
    allProjectNodes.length,
    currentGroupId,
  );
  if (!newProjectView) {
    throw createErrorObj(ERR_EVENTS.ACTION_REMOVING_PROJECT);
  }

  const { newTasksPageView, newProjectsPageView } = newProjectView;

  projectsList.innerHTML = '';
  newProjectsPageView.forEach((project) => renderProject(project));

  const currentGroup = document.querySelector(
    `.project[data-group-id='${currentGroupId}'], .bar-types > button[data-group-id='${currentGroupId}']`,
  );
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
  if (!eachIsHTMLElement(menu)) {
    throw createErrorObj(ERR_EVENTS.SUBMIT_NO_PROJECT_MENU);
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

  if (
    !eachIsHTMLElement(
      menu,
      menuCover,
      menuTitle,
      submitButton,
      inputProjectName,
    )
    || !isNodeList(inputsAllOptions)
  ) {
    throw createErrorObj(ERR_EVENTS.EXITING_PROJECT_MENU_RENDERING);
  }

  const selectedOption = menu.querySelector('.project-options .selected');

  menuTitle.textContent = '';
  submitButton.textContent = '';
  inputProjectName.value = '';
  inputsAllOptions.forEach((input) => {
    // eslint-disable-next-line no-param-reassign
    input.checked = false;
  });

  if (eachIsHTMLElement(selectedOption)) {
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
  const inputIcon = document.querySelector(
    '.project-menu input[name="iconURL"]:checked',
  );

  if (!eachIsValid(inputName.value)) {
    throw createErrorObj([
      'Invalid input (project name)',
      "Please provide a new project's name",
      '',
    ]);
  }
  if (
    !eachIsHTMLElement(inputIcon)
    || !eachIsValid(inputIcon.value, inputIcon.dataset.altText)
  ) {
    throw createErrorObj([
      'Invalid input (project icon)',
      'Please select an icon',
      '',
    ]);
  }

  switch (action) {
    case ACTIONS_PROJECTS.ADD_NEW: {
      const inputNewProject = {
        name: inputName.value,
        iconURL: inputIcon.value,
        altText: inputIcon.dataset.altText,
      };

      const { projectsList } = getProjectNodes();
      if (!eachIsHTMLElement(projectsList)) {
        throw createErrorObj(ERR_EVENTS.ACTION_SUBMITTING_PROJECT_LIST_PANEL);
      }

      const currentProjectsPageNumber = parseInt(
        projectsList.getAttribute('current-projects-page'),
        10,
      );
      if (!eachIsValid(currentProjectsPageNumber)) {
        throw createErrorObj(ERR_EVENTS.ACTION_ADDING_PROJECTS_NAV);
      }

      const addProject = application.createNewProject(
        inputNewProject,
        currentProjectsPageNumber,
      );
      if (!addProject) {
        throw createErrorObj(ERR_EVENTS.ACTION_SUBMITTING_PROJECT);
      }

      const { newProject, currentPageLength } = addProject;
      if (!eachIsObject(newProject)) {
        throw createErrorObj([
          'Invalid input (project name)',
          'A project with the new name already exists!',
          '',
        ]);
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
        throw createErrorObj(ERR_EVENTS.SUBMIT_PROJECT_MENU_SHOWING);
      }
      if (!id) {
        throw createErrorObj(ERR_EVENTS.SUBMIT_GROUP_ID);
      }

      const inputEditProject = {
        id,
        name: inputName.value,
        iconURL: inputIcon.value,
        altText: inputIcon.dataset.altText,
      };

      const editedProject = application.editProject(inputEditProject);
      if (!editedProject) {
        throw createErrorObj(ERR_EVENTS.ACTION_SUBMITTING_PROJECT);
      }

      if (!eachIsObject(editedProject)) {
        throw createErrorObj([
          'Invalid input (project name)',
          'A project with the new name already exists!',
          '',
        ]);
      }

      updateEditedProjectNode(editedProject);
      exitHandler(e);
      break;
    }
    default:
      throw createErrorObj(ERR_EVENTS.SHOWING_DEFAULT_ACTION);
  }
};

const updateEditedProjectNode = (project) => {
  const { currentGroupIcon, currentGroupName } = getProjectNodes();
  const {
    id, name, iconURL, altText,
  } = project;
  const editedProjectNodeName = document.querySelector(
    `.project[data-group-id="${id}"] span`,
  );
  const editedProjectNodeIcon = document.querySelector(
    `.project[data-group-id="${id}"] img`,
  );
  const editedProjectNode = document.querySelector(
    `.project[data-group-id="${id}"]`,
  );
  const editedProjectTaskNodes = document.querySelectorAll(
    `.task[data-project-id="${id}"]`,
  );

  if (
    !eachIsHTMLElement(
      currentGroupIcon,
      currentGroupName,
      editedProjectNodeName,
      editedProjectNodeIcon,
      editedProjectNode,
    )
  ) {
    throw createErrorObj(ERR_EVENTS.EDITED_PROJECT_NODES);
  }
  if (!eachIsValid(id, name, iconURL, altText)) {
    throw createErrorObj(ERR_EVENTS.EDITED_DATA_VALUES);
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
