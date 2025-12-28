import { getViewOptionsNodes } from './static-selectors';
import {
  SORTBY,
  createErrorObj,
  eachIsBoolean,
  eachIsHTMLElement,
  showErrorModal,
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
      flagIncludeHigh,
      flagIncludeMedium,
      flagIncludeNormal,
      flagIncludeOnGoing,
      flagIncludeCompleted,
      flagIncludeOverdue,
    )
  ) {
    const err = createErrorObj(ERR_RENDERING.FILTER_VALUES);
    showErrorModal(err);
    return;
  }
  if (!eachIsBoolean(ascendingOrder)) {
    const err = createErrorObjal(ERR_RENDERING.SORT_ORDER_VALUE);
    showErrorModal(err);
    return;
  }
  if (!Object.values(SORTBY).includes(sortBy)) {
    const err = createErrorObjal(ERR_RENDERING.SORT_OPTION_VALUE);
    showErrorModal(err);
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
