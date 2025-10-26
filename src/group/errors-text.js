import { Enum } from '../utils';

export const ERR_CONTROLLER = new Enum({
  TASK_LIST: 'Task list and/or group id couldn\'t be found in the storage',
  DEFAULT_ID: 'The default group id isn\'t valid',
});

export const ERR_RENDERING = new Enum({
  CURRENT_GROUP_MAIN: ['Application error', 'The elements of the current group couldn\'t be found in the main panel', 'Process: rendering the new group'],
  ALL_GROUP: ['Application error', 'The \'All group\' panel couldn\'t be found', 'Process: rendering the new group'],
  ADD_TASK_ICON: ['Application error', 'The \'Add task\' icon couldn\'t be found', 'Process: rendering the new group'],
  CURRENT_GROUP: ['Application error', 'The current group panel couldn\'t be found', 'Process: rendering the new group'],
  CURRENT_GROUP_ELEMENT: ['Application error', 'The name and/or icon element of the current group couldn\'t be found', 'Process: rendering the new group'],
});

export const ERR_EVENTS = new Enum({
  NO_SIDEBAR: ['Application error', 'The sidebar couldn\'t be found', 'Process: selecting the new group'],
  NO_GROUP_ID: ['Application error', 'The id of the selected group couldn\'t be found', 'Process: selecting the new group'],
  SIDEBAR_ELEMENTS: ['Application error', 'One or more elements of the sidebar couldn\'t be be found', 'Process: applying events on the sidebar'],
  NEW_GROUP: ['Application error', null, 'Process: selecting the new group'],
});
