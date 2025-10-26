import { getViewOptionsNodes } from './static-selectors';
import {
  SORTBY, isBoolean, isHTMLElement, showErrorModal,
} from '../utils';
import { ERR_RENDERING } from './errors-text';

export function applySavedViewState(application) {
  const viewState = application.getViewState();
  const {
    flagIncludeHigh,
    flagIncludeMedium,
    flagIncludeNormal,
    flagIncludeOverdue,
    flagIncludeOnGoing,
    flagIncludeCompleted,
    sortBy,
    ascendingOrder,
  } = viewState;
  const {
    inputPriorityHigh,
    inputPriorityMedium,
    inputPriorityNormal,
    inputStatusOnGoing,
    inputStatusCompleted,
    inputStatusOverdue,
    inputSortAscendingOrder,
  } = getViewOptionsNodes();
  const selectSortOptions = document.querySelector('.view-options-bar select');

  if (!isHTMLElement(inputPriorityHigh)
    || !isHTMLElement(inputPriorityMedium)
    || !isHTMLElement(inputPriorityNormal)
    || !isHTMLElement(inputStatusOnGoing)
    || !isHTMLElement(inputStatusCompleted)
    || !isHTMLElement(inputStatusOverdue)
    || !isHTMLElement(inputSortAscendingOrder)
    || !isHTMLElement(selectSortOptions)
  ) {
    showErrorModal(ERR_RENDERING.OPTIONS_NODES);
    return;
  }

  if (!isBoolean(flagIncludeHigh)
    || !isBoolean(flagIncludeMedium)
    || !isBoolean(flagIncludeNormal)
    || !isBoolean(flagIncludeOnGoing)
    || !isBoolean(flagIncludeCompleted)
    || !isBoolean(flagIncludeOverdue)
  ) {
    showErrorModal(ERR_RENDERING.FILTER_VALUES);
    return;
  }
  if (!isBoolean(ascendingOrder)) {
    showErrorModal(ERR_RENDERING.SORT_ORDER_VALUE);
    return;
  }
  if (!Object.values(SORTBY).includes(sortBy)) {
    showErrorModal(ERR_RENDERING.SORT_OPTION_VALUE);
    return;
  }

  inputPriorityHigh.checked = flagIncludeHigh;
  inputPriorityMedium.checked = flagIncludeMedium;
  inputPriorityNormal.checked = flagIncludeNormal;
  inputStatusOverdue.checked = flagIncludeOverdue;
  inputStatusOnGoing.checked = flagIncludeOnGoing;
  inputStatusCompleted.checked = flagIncludeCompleted;
  selectSortOptions.value = sortBy;
  inputSortAscendingOrder.checked = ascendingOrder;
}
