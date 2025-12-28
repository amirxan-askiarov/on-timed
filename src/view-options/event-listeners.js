import _ from 'lodash';
import {
  createErrorObj,
  eachIsBoolean,
  eachIsHTMLElement,
  isPressedKey,
  KEYPRESS_THROTTLE_TIME,
  safeThrottle,
  showErrorModal,
  SORTBY,
} from '../utils';
import { getMainNodes, getViewOptionsNodes } from './static-selectors';
import { ERR_RENDERING } from './errors-text';
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
  const { taskList } = getMainNodes();
  const selectSortOptions = document.querySelector(
    '.view-options-bar .custom-select > select',
  );

  if (!eachIsHTMLElement(taskList)) {
    const err = createErrorObj(ERR_RENDERING.TASK_LIST_PANEL);
    showErrorModal(err);
    return;
  }
  if (
    !eachIsHTMLElement(
      inputPriorityHigh,
      inputPriorityMedium,
      inputPriorityNormal,
      inputStatusOnGoing,
      inputStatusCompleted,
      inputStatusOverdue,
      inputSortAscendingOrder,
      selectSortOptions,
    )
  ) {
    const err = createErrorObj(ERR_RENDERING.OPTIONS_NODES);
    showErrorModal(err);
    return;
  }

  if (
    !eachIsBoolean(
      inputPriorityHigh.checked,
      inputPriorityMedium.checked,
      inputPriorityNormal.checked,
      inputStatusOnGoing.checked,
      inputStatusCompleted.checked,
      inputStatusOverdue.checked,
    )
  ) {
    const err = createErrorObj(ERR_RENDERING.FILTER_VALUES);
    showErrorModal(err);
    return;
  }
  if (!eachIsBoolean(inputSortAscendingOrder.checked)) {
    const err = createErrorObj(ERR_RENDERING.SORT_ORDER_VALUE);
    showErrorModal(err);
    return;
  }
  if (!Object.values(SORTBY).includes(selectSortOptions.value)) {
    const err = createErrorObj(ERR_RENDERING.SORT_OPTION_VALUE);
    showErrorModal(err);
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

  const handleViewBoxToggleThrottle = safeThrottle(
    (e) => handleViewBoxToggle(e),
    showErrorModal,
    KEYPRESS_THROTTLE_TIME,
  );

  function handleViewBoxToggle(e) {
    if (isPressedKey(e)) {
      viewBox.classList.toggle('shown');
    }
  }
  viewOptionsIcon.addEventListener('click', (e) => handleViewBoxToggleThrottle(e));

  const handleBoxSelectionThrottle = safeThrottle(
    (e, quer, app) => handleBoxSelection(e, quer, app),
    showErrorModal,
    KEYPRESS_THROTTLE_TIME,
  );

  customSelectBox.addEventListener('click', (e) => handleBoxSelectionThrottle(e, queries, application));
  customSelectBox.addEventListener('keydown', (e) => handleBoxSelectionThrottle(e, queries, application));

  const viewOptionToggleHandlerThrottle = safeThrottle(
    (e, quer, app) => viewOptionToggleHandler(e, quer, app),
    showErrorModal,
    KEYPRESS_THROTTLE_TIME,
  );

  toggleBoxes.forEach((box) => box.addEventListener('click', (e) => viewOptionToggleHandlerThrottle(e, queries, application)));
  toggleBoxes.forEach((box) => box.addEventListener('keydown', (e) => viewOptionToggleHandlerThrottle(e, queries, application)));
}
