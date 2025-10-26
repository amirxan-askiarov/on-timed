import { Enum } from '../utils';

export const ERR_RENDERING = new Enum({
  PROJECTS_VALUES: ['Application error', 'Current project count isn\'t a valid number', 'Process: rendering the number of projects'],
  PROJECTS_BAR: ['Application error', 'Projects bar and/or its components couldn\'t be found', 'Process: rendering the number of projects'],
  TASKS_VALUES: ['Application error', 'Current task count isn\'t a valid number', 'Process: rendering the number of tasks in the list'],
  TASKS_BAR: ['Application error', 'Tasks list heading could\'t be found', 'Process: rendering the number of tasks in the list'],
});
