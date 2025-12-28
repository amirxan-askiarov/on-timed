import { getTasksBarFooterNodes } from './static-selectors';
import {
  eachIsHTMLElement,
  isPressedKey,
  eachIsValid,
  createErrorObj,
} from '../utils';
import { ERR_EVENTS } from './errors-text';
import { renderTask } from '../task/dom';

export function handleMovePrevTasksPage(e, application) {
  if (isPressedKey(e)) {
    const { tasksList, prevPageBtn, nextPageBtn } = getTasksBarFooterNodes();
    if (!eachIsHTMLElement(prevPageBtn, nextPageBtn)) {
      throw createErrorObj(ERR_EVENTS.TASKS_BAR);
    }
    if (!eachIsHTMLElement(tasksList)) {
      throw createErrorObj(ERR_EVENTS.TASKS_LIST);
    }

    const currentTasksPageNumber = parseInt(
      tasksList.getAttribute('current-tasks-page'),
      10,
    );
    if (!eachIsValid(currentTasksPageNumber)) {
      throw createErrorObj(ERR_EVENTS.PROJECTS_NAV);
    }

    const prevTasksPage = application.moveTasksPageBackwards(
      currentTasksPageNumber,
    );
    if (!prevTasksPage) {
      throw createErrorObj(ERR_EVENTS.PREV_TASKS_PAGE);
    }

    if (currentTasksPageNumber !== prevTasksPage.newPageNumber) {
      tasksList.innerHTML = '';
      prevTasksPage.newPage.forEach((task) => renderTask(task));
    }
  }
}

export function handleMoveNextTasksPage(e, application) {
  if (isPressedKey(e)) {
    const { tasksList, prevPageBtn, nextPageBtn } = getTasksBarFooterNodes();
    if (!eachIsHTMLElement(prevPageBtn, nextPageBtn)) {
      throw createErrorObj(ERR_EVENTS.TASKS_BAR);
    }
    if (!eachIsHTMLElement(tasksList)) {
      throw createErrorObj(ERR_EVENTS.TASKS_LIST);
    }

    const currentTasksPageNumber = parseInt(
      tasksList.getAttribute('current-tasks-page'),
      10,
    );
    if (!eachIsValid(currentTasksPageNumber)) {
      throw createErrorObj(ERR_EVENTS.PROJECTS_NAV);
    }

    const nextTasksPage = application.moveTasksPageForward(
      currentTasksPageNumber,
    );
    if (!nextTasksPage) {
      throw createErrorObj(ERR_EVENTS.NEXT_TASKS_PAGE);
    }

    if (currentTasksPageNumber !== nextTasksPage.newPageNumber) {
      tasksList.innerHTML = '';
      nextTasksPage.newPage.forEach((task) => renderTask(task));
    }
  }
}
