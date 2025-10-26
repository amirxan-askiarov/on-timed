import { getTasksBarFooterNodes } from './static-selectors';
import { isHTMLElement, showErrorModal } from '../utils';
import { ERR_RENDERING } from './errors-text';

export function renderTasksPageNav(current, total) {
  if (typeof current !== 'number'
    || Number.isNaN(current)
    || typeof total !== 'number'
    || Number.isNaN(total)
  ) {
    showErrorModal(ERR_RENDERING.TASKS_VALUES);
    return;
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
  if (!isHTMLElement(nextPageBtn) || !isHTMLElement(tasksBarFooter)) {
    showErrorModal(ERR_RENDERING.TASKS_BAR);
    return;
  }
  if (!isHTMLElement(tasksPageNav)) {
    showErrorModal(ERR_RENDERING.TASKS_NAV);
    return;
  }
  if (!isHTMLElement(tasksList)) {
    showErrorModal(ERR_RENDERING.TASKS_LIST);
    return;
  }

  tasksList.setAttribute('current-tasks-page', `${currentNum}`);
  tasksPageNav.textContent = `${currentNum} / ${totalNum}`;
}
