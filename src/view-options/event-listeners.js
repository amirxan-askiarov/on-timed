import _ from 'lodash';
import {
  isBoolean, isHTMLElement, isPressedKey, KEYPRESS_THROTTLE_TIME, showErrorModal, SORTBY,
} from '../utils';
import { getMainNodes, getViewOptionsNodes } from './static-selectors';
import { ERR_EVENTS } from './errors-text';
import { handleBoxSelection, viewOptionToggleHandler } from './handlers';

export function addListenersViewOptions(application) {
  const {
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
  } = getViewOptionsNodes();
  const {
    taskList,
  } = getMainNodes();
  const selectSortOptions = document.querySelector('.view-options-bar .custom-select > select');

  if (!isHTMLElement(taskList)) {
    showErrorModal(ERR_EVENTS.TASK_LIST_PANEL);
    return;
  }
  if (!isHTMLElement(inputPriorityHigh)
    || !isHTMLElement(inputPriorityMedium)
    || !isHTMLElement(inputPriorityNormal)
    || !isHTMLElement(inputStatusOnGoing)
    || !isHTMLElement(inputStatusCompleted)
    || !isHTMLElement(inputStatusOverdue)
    || !isHTMLElement(inputSortAscendingOrder)
    || !isHTMLElement(selectSortOptions)
  ) {
    showErrorModal(ERR_EVENTS.OPTIONS_NODES);
    return;
  }

  if (!isBoolean(inputPriorityHigh.checked)
    || !isBoolean(inputPriorityMedium.checked)
    || !isBoolean(inputPriorityNormal.checked)
    || !isBoolean(inputStatusOnGoing.checked)
    || !isBoolean(inputStatusCompleted.checked)
    || !isBoolean(inputStatusOverdue.checked)
  ) {
    showErrorModal(ERR_EVENTS.FILTER_VALUES);
    return;
  }
  if (!isBoolean(inputSortAscendingOrder.checked)) {
    showErrorModal(ERR_EVENTS.SORT_ORDER_VALUE);
    return;
  }
  if (!Object.values(SORTBY).includes(selectSortOptions.value)) {
    showErrorModal(ERR_EVENTS.SORT_OPTION_VALUE);
    return;
  }

  const queries = {
    taskList,
    inputPriorityHigh,
    inputPriorityMedium,
    inputPriorityNormal,
    inputStatusOverdue,
    inputStatusOnGoing,
    inputStatusCompleted,
    selectSortOptions,
    inputSortAscendingOrder,
  };

  const handleViewBoxToggleThrottle = _
    .throttle((e) => handleViewBoxToggle(e), KEYPRESS_THROTTLE_TIME);
  function handleViewBoxToggle(e) {
    if (isPressedKey(e)) {
      viewBox.classList.toggle('shown');
    }
  }
  viewOptionsIcon.addEventListener('click', (e) => handleViewBoxToggleThrottle(e));

  const handleBoxSelectionThrottle = _
    .throttle((e, quer, app) => handleBoxSelection(e, quer, app), KEYPRESS_THROTTLE_TIME);
  customSelectBox.addEventListener('click', (e) => handleBoxSelectionThrottle(e, queries, application));
  customSelectBox.addEventListener('keydown', (e) => handleBoxSelectionThrottle(e, queries, application));

  const viewOptionToggleHandlerThrottle = _
    .throttle((e, quer, app) => viewOptionToggleHandler(e, quer, app), KEYPRESS_THROTTLE_TIME);
  toggleBoxes.forEach((box) => box
    .addEventListener('click', (e) => viewOptionToggleHandlerThrottle(e, queries, application)));
  toggleBoxes.forEach((box) => box
    .addEventListener('keydown', (e) => viewOptionToggleHandlerThrottle(e, queries, application)));
}
