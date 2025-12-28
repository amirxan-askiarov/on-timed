import { renderTask } from '../task/dom';
import { eachIsHTMLElement, isPressedKey, createErrorObj } from '../utils';
import { ERR_EVENTS } from './errors-text';

export function handleBoxSelection(e, queries, application) {
  const selectSortOptions = document.querySelector(
    '.view-options-bar .custom-select > select',
  );
  if (!eachIsHTMLElement(selectSortOptions)) {
    throw createErrorObj(ERR_EVENTS.OPTIONS_NODES);
  }

  if (isPressedKey(e)) {
    if (e.target.tagName !== 'DIV') {
      return;
    }
    const optionValue = e.target.getAttribute('value');
    if (optionValue !== null && optionValue !== undefined) {
      selectSortOptions.value = optionValue;
      updateTaskListView(queries, application);
    }
  }
}

export function viewOptionToggleHandler(e, queries, application) {
  if (isPressedKey(e) && e.target.closest('.option-button')) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    const element = e.target.closest('.option-button');
    if (!element) {
      return;
    }
    const input = element.firstElementChild;
    if (!input || input.tagName !== 'INPUT') {
      return;
    }
    input.checked = !input.checked;
    element.classList.toggle('enabled');
    updateTaskListView(queries, application);
  }
}

const updateTaskListView = (queries, application) => {
  const newState = {
    flagIncludeHigh: null,
    flagIncludeMedium: null,
    flagIncludeNormal: null,
    flagIncludeOverdue: null,
    flagIncludeOnGoing: null,
    flagIncludeCompleted: null,
    sortBy: null,
    ascendingOrder: null,
  };

  const {
    taskList,
    inputPriorityHigh,
    inputPriorityMedium,
    inputPriorityNormal,
    inputStatusOverdue,
    inputStatusOnGoing,
    inputStatusCompleted,
    selectSortOptions,
    inputSortAscendingOrder,
  } = queries;

  newState.flagIncludeHigh = inputPriorityHigh.checked;
  newState.flagIncludeMedium = inputPriorityMedium.checked;
  newState.flagIncludeNormal = inputPriorityNormal.checked;
  newState.flagIncludeOverdue = inputStatusOverdue.checked;
  newState.flagIncludeOnGoing = inputStatusOnGoing.checked;
  newState.flagIncludeCompleted = inputStatusCompleted.checked;
  newState.sortBy = selectSortOptions.value;
  newState.ascendingOrder = inputSortAscendingOrder.checked;

  const tasksWithUpdatedView = application.applyViewOptions(newState);
  if (!tasksWithUpdatedView) {
    throw createErrorObj(ERR_EVENTS.UPDATING_TASKS_NODE);
  }

  taskList.innerHTML = '';
  tasksWithUpdatedView.forEach((task) => renderTask(task));
};
