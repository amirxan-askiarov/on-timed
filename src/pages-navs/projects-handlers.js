import { getProjectsBarFooterNodes } from './static-selectors';
import {
  isHTMLElement, isPressedKey, showErrorModal, isValid,
} from '../utils';
import { ERR_EVENTS } from './errors-text';
import { renderProject } from '../project/dom';

export function handleMovePrevProjectsPage(e, application) {
  const { projectsList, prevPageBtn, nextPageBtn } = getProjectsBarFooterNodes();
  if (isPressedKey(e)) {
    if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
      showErrorModal(ERR_EVENTS.PROJECTS_BAR);
      return;
    }
    if (!isHTMLElement(projectsList)) {
      showErrorModal(ERR_EVENTS.PROJECTS_LIST);
      return;
    }

    const currentProjectsPageNumber = parseInt(projectsList.getAttribute('current-projects-page'), 10);
    if (!isValid(currentProjectsPageNumber)) {
      showErrorModal(ERR_EVENTS.PROJECTS_NAV);
      return;
    }

    let prevProjectsPage;
    try {
      prevProjectsPage = application.moveProjectsPageBackwards(currentProjectsPageNumber);
    } catch (err) {
      showErrorModal(
        [ERR_EVENTS.PREV_PROJECTS_PAGE[0], err.message, ERR_EVENTS.PREV_PROJECTS_PAGE[2]],
      );
      return;
    }

    if (currentProjectsPageNumber === prevProjectsPage.newPageNumber) {
      return;
    }

    projectsList.innerHTML = '';
    prevProjectsPage.newPage.forEach((project) => renderProject(project));
  }
}

export function handleMoveNextProjectsPage(e, application) {
  const { projectsList, prevPageBtn, nextPageBtn } = getProjectsBarFooterNodes();
  if (isPressedKey(e)) {
    if (!isHTMLElement(prevPageBtn) || !isHTMLElement(nextPageBtn)) {
      showErrorModal(ERR_EVENTS.PROJECTS_BAR);
      return;
    }
    if (!isHTMLElement(projectsList)) {
      showErrorModal(ERR_EVENTS.PROJECTS_LIST);
      return;
    }

    const currentProjectsPageNumber = parseInt(projectsList.getAttribute('current-projects-page'), 10);
    if (!isValid(currentProjectsPageNumber)) {
      showErrorModal(ERR_EVENTS.PROJECTS_NAV);
      return;
    }

    let nextProjectsPage;
    try {
      nextProjectsPage = application.moveProjectsPageForward(currentProjectsPageNumber);
    } catch (err) {
      showErrorModal(
        [ERR_EVENTS.NEXT_PROJECTS_PAGE[0], err.message, ERR_EVENTS.NEXT_PROJECTS_PAGE[2]],
      );
      return;
    }

    if (currentProjectsPageNumber === nextProjectsPage.newPageNumber) {
      return;
    }

    projectsList.innerHTML = '';
    nextProjectsPage.newPage.forEach((project) => renderProject(project));
  }
}
