let viewOptionsNodes;
export function getViewOptionsNodes() {
  if (viewOptionsNodes) {
    return viewOptionsNodes;
  }

  const buttonPriorityHigh = document.querySelector('button.priority-high');
  const buttonPriorityMedium = document.querySelector('button.priority-medium');
  const buttonPriorityNormal = document.querySelector('button.priority-normal');
  const buttonStatusOnGoing = document.querySelector('button.status-ongoing');
  const buttonStatusCompleted = document.querySelector('button.status-completed');
  const buttonStatusOverdue = document.querySelector('button.status-overdue');
  const buttonSortAscendingOrder = document.querySelector('button.sort-arrow');

  const inputPriorityHigh = document.querySelector('input#view-priority-high');
  const inputPriorityMedium = document.querySelector('input#view-priority-medium');
  const inputPriorityNormal = document.querySelector('input#view-priority-normal');
  const inputStatusOnGoing = document.querySelector('input#view-status-ongoing');
  const inputStatusCompleted = document.querySelector('input#view-status-completed');
  const inputStatusOverdue = document.querySelector('input#view-status-overdue');
  const inputSortAscendingOrder = document.querySelector('input#sort-order');

  const viewOptionsIcon = document.querySelector('header > .options');
  const viewBox = document.querySelector('.view-options-bar');
  const customSelectBox = document.querySelector('.view-options-bar .select-items');
  const toggleBoxes = document.querySelectorAll('.view-options-bar .priority-border-box, .view-options-bar .status-border-box, .view-options-bar .sort-arrow');

  viewOptionsNodes = {
    buttonPriorityHigh,
    buttonPriorityMedium,
    buttonPriorityNormal,
    buttonStatusOnGoing,
    buttonStatusCompleted,
    buttonStatusOverdue,
    buttonSortAscendingOrder,
    inputPriorityHigh,
    inputPriorityMedium,
    inputPriorityNormal,
    inputStatusOnGoing,
    inputStatusCompleted,
    inputStatusOverdue,
    inputSortAscendingOrder,
    viewOptionsIcon,
    viewBox,
    toggleBoxes,
    customSelectBox,
  };

  return viewOptionsNodes;
}

let mainNodes;
export function getMainNodes() {
  if (mainNodes) {
    return mainNodes;
  }

  const main = document.querySelector('.content main');
  const taskList = document.querySelector('.content main ul.task-list');

  mainNodes = {
    main,
    taskList,
  };

  return mainNodes;
}
