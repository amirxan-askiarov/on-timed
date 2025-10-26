import { Enum } from '../utils';

export const ERR_CONTROLLER = new Enum({
  TASK_GROUP: 'Current tasks group couldn\'t be found in the storage',
  FILTER_VALUES: 'One or more of the filter option values isn\'t valid',
  SORT_ORDER_VALUE: 'The order value of sort option isn\'t valid',
  SORT_OPTION_VALUE: 'Sort option value isn\'t valid',
});

export const ERR_RENDERING = new Enum({
  OPTIONS_NODES: ['Application error', 'One or more the filter option elements couldn\'t be found', 'Process: rendering filtering options menu'],
  FILTER_VALUES: ['Application error', 'One or more of the filter option values isn\'t valid', 'Process: rendering filtering options menu'],
  SORT_ORDER_VALUE: ['Application error', 'The order value of sort option isn\'t valid', 'Process: rendering filtering options menu'],
  SORT_OPTION_VALUE: ['Application error', 'Sort option value isn\'t valid', 'Process: rendering filtering options menu'],
});

export const ERR_EVENTS = new Enum({
  TASK_LIST_PANEL: ['Application error', 'Task list panel couldn\'t be found', 'Process: applying events to the filtering options menu'],
  OPTIONS_NODES: ['Application error', 'One or more the filter option elements couldn\'t be found', 'Process: applying events to the filtering options menu'],
  FILTER_VALUES: ['Application error', 'One or more of the filter option values isn\'t valid', 'Process: applying events to the filtering options menu'],
  SORT_ORDER_VALUE: ['Application error', 'The order value of sort option isn\'t valid', 'Process: applying events to the filtering options menu'],
  SORT_OPTION_VALUE: ['Application error', 'Sort option value isn\'t valid', 'Process: applying events to the filtering options menu'],
  UPDATING_TASKS_NODE: ['Application error', null, 'Process: applying the updated view options'],
});
