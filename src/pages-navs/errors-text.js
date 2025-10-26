import { Enum } from '../utils';

export const ERR_CONTROLLER = new Enum({
  NUM: 'Current page isn\'t a valid number',
  LIST: 'The list couldn\'t be found in the storage',
});

export const ERR_RENDERING = new Enum({
  PROJECTS_VALUES: ['Application error', 'The total number of projects pages and/or current project page isn\'t a valid number', 'Process: rendering the projects navigation bar'],
  PROJECTS_BAR: ['Application error', 'The projects navigation buttons couldn\'t be found', 'Process: rendering the projects navigation bar'],
  PROJECTS_NAV: ['Application error', 'The projects pagination couldn\'t be found', 'Process: rendering the projects navigation bar'],
  PROJECTS_LIST: ['Application error', 'The projects list component couldn\'t be found', 'Process: rendering the projects navigation bar'],
  TASKS_BAR: ['Application error', 'The tasks navigation buttons couldn\'t be found', 'Process: rendering the tasks navigation bar'],
  TASKS_NAV: ['Application error', 'The tasks pagination couldn\'t be found', 'Process: rendering the tasks navigation bar'],
  TASKS_VALUES: ['Application error', 'The total number of projects pages and/or current project page isn\'t a valid number', 'Process: rendering the tasks navigation bar'],
  TASKS_LIST: ['Application error', 'The tasks list component couldn\'t be found', 'Process: rendering the tasks navigation bar'],
});

export const ERR_EVENTS = new Enum({
  PROJECTS_BAR: ['Application error', 'The projects navigation buttons couldn\'t be found', 'Process: applying events on the projects navigation bar'],
  PROJECTS_LIST: ['Application error', 'The projects list component couldn\'t be found', 'Process: applying events on the projects navigation bar'],
  PROJECTS_NAV: ['Application error', 'The projects pagination data couldn\'t be found', 'Process: applying events on the projects navigation bar'],
  NEXT_PROJECTS_PAGE: ['Application error', null, 'Process: populating the next projects page'],
  PREV_PROJECTS_PAGE: ['Application error', null, 'Process: populating the previous projects page'],
  TASKS_BAR: ['Application error', 'The tasks navigation buttons couldn\'t be found', 'Process: applying events on the tasks navigation bar'],
  TASKS_LIST: ['Application error', 'The tasks list component couldn\'t be found', 'Process: applying events on the tasks navigation bar'],
  TASKS_NAV: ['Application error', 'The tasks pagination data couldn\'t be found', 'Process: applying events on the tasks navigation bar'],
  NEXT_TASK_PAGE: ['Application error', null, 'Process: populating the next tasks page'],
  PREV_TASK_PAGE: ['Application error', null, 'Process: populating the previous tasks page'],
});
