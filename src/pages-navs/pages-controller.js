import { NUM_PROJECTS_PAGE, NUM_TASKS_PAGE } from '../utils';
import { ERR_CONTROLLER } from './errors-text';

const pagesController = (numTasksPerPage) => ({
  movePageForward: (currentPage, listArr) => {
    if (typeof currentPage !== 'number') {
      throw new Error(ERR_CONTROLLER.NUM);
    }
    if (!Array.isArray(listArr)) {
      throw new Error(ERR_CONTROLLER.LIST);
    }

    let newPageNumber = currentPage;
    if (currentPage < pagesController(numTasksPerPage).pagesTotal(listArr)) {
      newPageNumber += 1;
    }
    const newPage = pagesController(numTasksPerPage).getPageItems(newPageNumber, listArr);
    return { newPage, newPageNumber };
  },
  movePageBackwards: (currentPage, listArr) => {
    if (typeof currentPage !== 'number') {
      throw new Error(ERR_CONTROLLER.NUM);
    }
    if (!Array.isArray(listArr)) {
      throw new Error(ERR_CONTROLLER.LIST);
    }

    let newPageNumber = currentPage;
    if (currentPage > 1) {
      newPageNumber -= 1;
    }
    const newPage = pagesController(numTasksPerPage).getPageItems(newPageNumber, listArr);
    return { newPageNumber, newPage };
  },
  getPageItems: (currentPage, listArr) => {
    if (typeof currentPage !== 'number') {
      throw new Error(ERR_CONTROLLER.NUM);
    }
    if (!Array.isArray(listArr)) {
      throw new Error(ERR_CONTROLLER.LIST);
    }

    const startIndex = (currentPage - 1) * numTasksPerPage;
    const endIndex = startIndex + numTasksPerPage;
    return listArr.slice(startIndex, endIndex);
  },
  pagesTotal: (listArr) => {
    if (!Array.isArray(listArr)) {
      throw new Error(ERR_CONTROLLER.LIST);
    }
    return Math.ceil(listArr.length / numTasksPerPage);
  },
});

export const projectsPageController = pagesController(NUM_PROJECTS_PAGE);
export const tasksPageController = pagesController(NUM_TASKS_PAGE);
