import { getTasksBarFooterNodes } from './static-selectors';
import {
  isHTMLElement, isPressedKey, showErrorModal, isValid,
} from '../utils';
import { ERR_EVENTS } from './errors-text';
import { renderTask } from '../task/dom';

export function handleMovePrevTasksPage(e, application) {
  if (isPressedKey(e)) {
    const { tasksList, prevPageBtn, nextPageBtn } = getTasksBarFooterNodes();
    if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
      showErrorModal(ERR_EVENTS.TASKS_BAR);
      return;
    }
    if (!isHTMLElement(tasksList)) {
      showErrorModal(ERR_EVENTS.TASKS_LIST);
      return;
    }

    const currentTasksPageNumber = parseInt(tasksList.getAttribute('current-tasks-page'), 10);
    if (!isValid(currentTasksPageNumber)) {
      showErrorModal(ERR_EVENTS.PROJECTS_NAV);
      return;
    }

    let prevTasksPage;
    try {
      prevTasksPage = application.moveTasksPageBackwards(currentTasksPageNumber);
    } catch (err) {
      showErrorModal([ERR_EVENTS.PREV_TASKS_PAGE[0], err.message, ERR_EVENTS.PREV_TASKS_PAGE[2]]);
      return;
    }

    if (currentTasksPageNumber === prevTasksPage.newPageNumber) {
      return;
    }

    tasksList.innerHTML = '';
    prevTasksPage.newPage.forEach((task) => renderTask(task));
  }
}

export function handleMoveNextTasksPage(e, application) {
  if (isPressedKey(e)) {
    const { tasksList, prevPageBtn, nextPageBtn } = getTasksBarFooterNodes();
    if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
      showErrorModal(ERR_EVENTS.TASKS_BAR);
      return;
    }
    if (!isHTMLElement(tasksList)) {
      showErrorModal(ERR_EVENTS.TASKS_LIST);
      return;
    }

    const currentTasksPageNumber = parseInt(tasksList.getAttribute('current-tasks-page'), 10);
    if (!isValid(currentTasksPageNumber)) {
      showErrorModal(ERR_EVENTS.PROJECTS_NAV);
      return;
    }

    let nextTasksPage;
    try {
      nextTasksPage = application.moveTasksPageForward(currentTasksPageNumber);
    } catch (err) {
      showErrorModal([ERR_EVENTS.NEXT_TASKS_PAGE[0], err.message, ERR_EVENTS.NEXT_TASKS_PAGE[2]]);
      return;
    }

    if (currentTasksPageNumber === nextTasksPage.newPageNumber) {
      return;
    }

    tasksList.innerHTML = '';
    nextTasksPage.newPage.forEach((task) => renderTask(task));
  }
}
