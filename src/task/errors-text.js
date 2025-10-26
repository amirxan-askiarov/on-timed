import { Enum } from '../utils';

export const ERR_CONTROLLER = new Enum({
  TASK_LIST: 'The current task list couldn\'t be found in the storage',
  TASK_DATA: 'One or more task data entries couldn\'t be identified',
  DUPLICATE_TASK: 'The task with this title already exists!',
  NO_INDEX: 'The id of the task couldn\'t be found in the storage',
  EDIT_PROJECT_DATA: 'The new project name couldn\'t be identified',
});

export const ERR_RENDERING = new Enum({
  TASK_VALUES: ['Application error', 'One or more of the task values couldn\'t be found', 'Process: rendering the task'],
  TASK_LIST_PANEL: ['Application error', 'Task list panel couldn\'t be found', 'Process: rendering the task'],
});

export const ERR_EVENTS = new Enum({
  TASK_MENU_RENDERING: ['Application error', 'One or more menu components couldn\'t be found', 'Process: applying events on the task menu'],
  DEFAULT_ACTION: ['Application error', 'Task action isn\'t valid', 'Process: applying events on the task menu'],
  TASK_MENU_SHOWING: ['Application error', 'One or more menu components couldn\'t be found', 'Process: showing the task menu'],
  TASK_MENU_ADD: ['Application error', 'Current project and/or its id couldn\'t be found', 'Process: showing the task menu (add)'],
  NO_TASK_OR_IDS_UPDATE: ['Application error', 'Task panel and/or task and/or project id couldn\'t be found', 'Process: updating the task status'],
  NO_TOGGLE_ICON: ['Application error', 'Toggle icon of the panel couldn\'t be found', 'Process: updating the task status'],
  ACTION_UPDATE_STATUS: ['Application error', null, 'Process: updating the task status'],
  ACTION_UPDATE_STATUS_INVALID: ['Application error', 'Status couldn\'t be updated sucessfully', 'Process: updating the task status'],
  NO_TASK_OR_IDS_EDIT_SHOWING: ['Application error', 'Task panel and/or one of its components couldn\'t be found or isn\'t valid', 'Process: showing the task menu (edit)'],
  EDITED_TASK_PRIORITY_VALUE: ['Application error', 'The tasks priority value isn\'t valid', 'Process: showing the task menu (edit)'],
  NO_TASK_OR_IDS_REMOVE: ['Application error', 'Task panel and/or task and/or project id couldn\'t be found', 'Process: showing the task remove confirmation menu (remove)'],
  TASK_UNFOLD_NODES: ['Application error', 'Task panel and/or its unfolded box couldn\'t be found', 'Process: unfolding the task panel'],
  TASK_MENU_REMOVING: ['Application error', 'Removed task and/or its id and/or project id couldn\'t be found', 'Process: removing the task'],
  TASK_REMOVING: ['Application error', 'Removed task and/or its id and/or project id couldn\'t be found', 'Process: removing the task'],
  ACTION_REMOVING_TASK: ['Application error', null, 'Process: removing the task'],
  ACTION_REMOVING_TASKS_LIST: ['Application error', 'The tasks list panel or its data couldn\'t be found', 'Process: removing the task'],
  ACTION_REMOVING_SIDEBAR: ['Application error', 'The sidebar or its data couldn\'t be found', 'Process: removing the task'],
  ACTION_REMOVING_TASKS_NODES: ['Application error', 'The current list of tasks couldn\'t be found', 'Process: removing the task'],
  NO_TASK_MENU_SUBMIT: ['Application error', 'Task menu couldn\'t be found', 'Process: submitting the task'],
  TASK_MENU_PANEL_SUBMIT: ['Application error', 'One or more menu components couldn\'t be found', 'Process: submitting the task'],
  NO_PROJECT_ID_OR_ACTION: ['Application error', 'Action and/or project id and/or current page couldn\'t be found', 'Process: submitting the task'],
  ACTION_ADDING_TASK: ['Application error', null, 'Process: adding the new task'],
  TASK_ID_EDITING: ['Application error', 'Task id couldn\'t be found', 'Process: submitting the task'],
  TASK_MENU_PANEL_EDITING: ['Application error', 'One or more menu components couldn\'t be found', 'Process: submitting the task'],
  ACTION_EDITING_TASK: ['Application error', null, 'Process: editing the task'],
  TASK_MENU_PANEL_EXITING: ['Application error', 'One or more menu components couldn\'t be found', 'Process: exiting the task menu'],
});
