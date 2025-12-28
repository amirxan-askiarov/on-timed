import { getProjectsBarFooterNodes } from './static-selectors';
import {
  eachIsHTMLElement,
  isPressedKey,
  eachIsValid,
  createErrorObj,
} from '../utils';
import { ERR_EVENTS } from './errors-text';
import { renderProject } from '../project/dom';

export function handleMovePrevProjectsPage(e, application) {
  const { projectsList, prevPageBtn, nextPageBtn } = getProjectsBarFooterNodes();
  if (isPressedKey(e)) {
    if (!eachIsHTMLElement(prevPageBtn, nextPageBtn)) {
      throw createErrorObj(ERR_EVENTS.PROJECTS_BAR);
    }
    if (!eachIsHTMLElement(projectsList)) {
      throw createErrorObj(ERR_EVENTS.PROJECTS_LIST);
    }

    const currentProjectsPageNumber = parseInt(
      projectsList.getAttribute('current-projects-page'),
      10,
    );
    if (!eachIsValid(currentProjectsPageNumber)) {
      throw createErrorObj(ERR_EVENTS.PROJECTS_NAV);
    }

    const prevProjectsPage = application.moveProjectsPageBackwards(
      currentProjectsPageNumber,
    );
    if (!prevProjectsPage) {
      throw createErrorObj(ERR_EVENTS.PREV_PROJECTS_PAGE);
    }

    if (currentProjectsPageNumber !== prevProjectsPage.newPageNumber) {
      projectsList.innerHTML = '';
      prevProjectsPage.newPage.forEach((project) => renderProject(project));
    }
  }
}

export function handleMoveNextProjectsPage(e, application) {
  const { projectsList, prevPageBtn, nextPageBtn } = getProjectsBarFooterNodes();
  if (isPressedKey(e)) {
    if (!eachIsHTMLElement(prevPageBtn, nextPageBtn)) {
      throw createErrorObj(ERR_EVENTS.PROJECTS_BAR);
    }
    if (!eachIsHTMLElement(projectsList)) {
      throw createErrorObj(ERR_EVENTS.PROJECTS_LIST);
    }

    const currentProjectsPageNumber = parseInt(
      projectsList.getAttribute('current-projects-page'),
      10,
    );
    if (!eachIsValid(currentProjectsPageNumber)) {
      throw createErrorObj(ERR_EVENTS.PROJECTS_NAV);
    }

    const nextProjectsPage = application.moveProjectsPageForward(
      currentProjectsPageNumber,
    );
    if (!nextProjectsPage) {
      throw createErrorObj(ERR_EVENTS.NEXT_PROJECTS_PAGE);
    }

    if (currentProjectsPageNumber !== nextProjectsPage.newPageNumber) {
      projectsList.innerHTML = '';
      nextProjectsPage.newPage.forEach((project) => renderProject(project));
    }
  }
}
