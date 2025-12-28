import { getTasksBarFooterNodes } from './static-selectors';
import { eachIsHTMLElement, createErrorObj } from '../utils';
import { ERR_RENDERING } from './errors-text';

export function renderTasksPageNav(current, total) {
  if (
    typeof current !== 'number'
    || Number.isNaN(current)
    || typeof total !== 'number'
    || Number.isNaN(total)
  ) {
    throw createErrorObj(ERR_RENDERING.TASKS_VALUES);
  }

  let currentNum = current;
  if (current === 0) {
    currentNum = 1;
  }
  let totalNum = total;
  if (total === 0) {
    totalNum = 1;
  }

  const {
    nextPageBtn, tasksBarFooter, tasksPageNav, tasksList,
  } = getTasksBarFooterNodes();
  if (!eachIsHTMLElement(nextPageBtn) || !eachIsHTMLElement(tasksBarFooter)) {
    throw createErrorObj(ERR_RENDERING.TASKS_BAR);
  }
  if (!eachIsHTMLElement(tasksPageNav)) {
    throw createErrorObj(ERR_RENDERING.TASKS_NAV);
  }
  if (!eachIsHTMLElement(tasksList)) {
    throw createErrorObj(ERR_RENDERING.TASKS_LIST);
  }

  tasksList.setAttribute('current-tasks-page', `${currentNum}`);
  tasksPageNav.textContent = `${currentNum} / ${totalNum}`;
}
