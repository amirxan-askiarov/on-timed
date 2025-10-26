import { Enum } from '../utils';

export const ERR_CONTROLLER = new Enum({
  PROJECT_LIST: 'The current project list couldn\'t be found in the storage',
  PROJECT_DATA: 'The entered project name or icon couldn\'t be identified',
  INVALID_INDEX: 'The id of the project couldn\'t be identified',
  NO_INDEX: 'The id of the project couldn\'t be found in the storage',
});

export const ERR_RENDERING = new Enum({
  PROJECT_LIST_PANEL: ['Application error', 'The project list panel couldn\'t be found', 'Process: rendering the project'],
  PROJECT_VALUES: ['Application error', 'One or more of the project values couldn\'t be found', 'Process: rendering the project'],
});

export const ERR_EVENTS = new Enum({
  APPLY_EVENTS_PROJECT_MENU_RENDERING: ['Application error', 'One or more menu components couldn\'t be found', 'Process: applying events to the projects menu'],
  SHOWING_DEFAULT_ACTION: ['Application error', 'The project action isn\'t valid', 'Process: showing the project menu'],
  PROJECT_MENU_SHOWING: ['Application error', 'One or more menu components couldn\'t be found', 'Process: showing the project menu'],
  EDITED_PROJECT: ['Application error', 'The edited project and/or its id couldn\'t be found', 'Process: showing the project menu'],
  EDITED_PROJECT_VALUES: ['Application error', 'One or more edited project data values couldn\'t be found', 'Process: showing the project menu'],
  EDITED_PROJECT_URL: ['Application error', 'The icon url source isn\'t valid', 'Process: showing the project menu'],
  ACTION_REMOVING_PROJECT: ['Application error', null, 'Process: removing the project'],
  REMOVED_PROJECT_NODES: ['Application error', 'The current group icon and/or heading couldn\'t be found', 'Process: showing the project remove confirmation menu'],
  REMOVED_PROJECT: ['Application error', 'The removed project and/or its id couldn\'t be found', 'Process: showing the project remove confirmation menu'],
  REMOVE_MENU_NODES: ['Application error', 'One or more menu components couldn\'t be found', 'Process: removing the project'],
  REMOVE_MENU_PROJECT: ['Application error', 'The removed project and/or its id couldn\'t be found', 'Process: removing the project'],
  ACTION_SUBMITTING_PROJECT: ['Application error', null, 'Process: submitting the project'],
  ACTION_ADDING_PROJECTS_NAV: ['Application error', 'The projects pagination data couldn\'t be found', 'Process: submitting the project'],
  ACTION_SUBMITTING_PROJECT_LIST_PANEL: ['Application error', 'The project list panel couldn\'t be found', 'Process: submitting the project'],
  ACTION_REMOVING_CURRENT_GROUP: ['Application error', 'The current group couldn\'t be found', 'Process: removing the project'],
  ACTION_REMOVING_PROJECTS_NAV: ['Application error', 'The projects pagination and/or the current group data couldn\'t be found', 'Process: removing the project'],
  ACTION_REMOVING_PROJECT_LIST_PANEL: ['Application error', 'The project list panel or projects couldn\'t be found', 'Process: removing the project'],
  ACTION_REMOVING_NO_SIDEBAR: ['Application error', 'The sidebar or the tasks list couldn\'t be found', 'Process: removing the project'],
  SUBMIT_NO_PROJECT_MENU: ['Application error', 'The project menu couldn\'t be found', 'Process: submitting the project'],
  SUBMIT_PROJECT_MENU_SHOWING: ['Application error', 'One or more menu components couldn\'t be found', 'Process: submitting the project'],
  SUBMIT_GROUP_ID: ['Application error', 'The group id couldn\'t be found', 'Process: submitting the project'],
  EDITED_PROJECT_NODES: ['Application error', 'One or more edited project components couldn\'t be found', 'Process: updating the edited project element'],
  EDITED_DATA_VALUES: ['Application error', 'One or more edited project data values couldn\'t be found', 'Process: updating the edited project element'],
  EXITING_PROJECT_MENU_RENDERING: ['Application error', 'One or more menu components couldn\'t be found', 'Process: exiting the projects menu'],
});
