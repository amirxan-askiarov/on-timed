import { getProjectsBarFooterNodes } from './static-selectors';
import { eachIsHTMLElement, createErrorObj } from '../utils';
import { ERR_RENDERING } from './errors-text';

export function renderProjectsPageNav(current, total) {
  if (
    typeof current !== 'number'
    || Number.isNaN(current)
    || typeof total !== 'number'
    || Number.isNaN(total)
  ) {
    throw createErrorObj(ERR_RENDERING.PROJECTS_VALUES);
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
    nextPageBtn, projectsBarFooter, projectsPageNav, projectsList,
  } = getProjectsBarFooterNodes();
  if (!eachIsHTMLElement(nextPageBtn, projectsBarFooter)) {
    throw createErrorObj(ERR_RENDERING.PROJECTS_BAR);
  }
  if (!eachIsHTMLElement(projectsPageNav)) {
    throw createErrorObj(ERR_RENDERING.PROJECTS_NAV);
  }
  if (!eachIsHTMLElement(projectsList)) {
    throw createErrorObj(ERR_RENDERING.PROJECTS_LIST);
  }

  projectsList.setAttribute('current-projects-page', `${currentNum}`);
  projectsPageNav.textContent = `${currentNum} / ${totalNum}`;
}
