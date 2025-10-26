import { STATUS, STANDARD_GROUPS } from '../utils';
import { ERR_CONTROLLER } from './errors-text';

export const groupsController = {
  getTaskListByGroup: (taskList, groupIdentifier) => {
    if (!Array.isArray(taskList)) {
      throw new Error(ERR_CONTROLLER.TASK_LIST);
    }

    switch (groupIdentifier) {
      case STANDARD_GROUPS.ALL:
        return taskList;
      case STANDARD_GROUPS.TODAY:
        return filterTasksByToday(taskList);
      case STANDARD_GROUPS.WEEK:
        return filterTasksByWeek(taskList);
      case STANDARD_GROUPS.COMPLETED:
        return filterTasksByStatus(taskList, STATUS.COMPLETED);
      case STANDARD_GROUPS.OVERDUE:
        return filterTasksByStatus(taskList, STATUS.OVERDUE);
      default:
        throw new Error(ERR_CONTROLLER.DEFAULT_ID);
    }
  },
};

const filterTasksByToday = (taskList) => taskList.filter(({ dueDate }) => {
  const parsedDueDate = new Date(dueDate);
  const now = new Date();

  return now.getDate() === parsedDueDate.getDate()
  && now.getMonth() === parsedDueDate.getMonth()
  && now.getFullYear() === parsedDueDate.getFullYear();
});
const filterTasksByWeek = (taskList) => {
  const today = new Date();
  const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
  return taskList.filter(({ dueDate }) => {
    const taskDueDate = new Date(dueDate);
    const timeDifference = taskDueDate - today;
    const weeksDifference = Math.floor(timeDifference / millisecondsInAWeek);
    return weeksDifference === 0;
  });
};
const filterTasksByStatus = (taskList, status) => taskList
  .filter(({ status: taskStatus }) => taskStatus === status);
