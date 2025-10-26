import { getProjectsBarFooterNodes } from './static-selectors';
import { isHTMLElement, showErrorModal } from '../utils';
import { ERR_RENDERING } from './errors-text';

export function renderProjectsPageNav(current, total) {
  if (typeof current !== 'number'
    || Number.isNaN(current)
    || typeof total !== 'number'
    || Number.isNaN(total)
  ) {
    showErrorModal(ERR_RENDERING.PROJECTS_VALUES);
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
    nextPageBtn, projectsBarFooter, projectsPageNav, projectsList,
  } = getProjectsBarFooterNodes();
  if (!isHTMLElement(nextPageBtn) || !isHTMLElement(projectsBarFooter)) {
    showErrorModal(ERR_RENDERING.PROJECTS_BAR);
    return;
  }
  if (!isHTMLElement(projectsPageNav)) {
    showErrorModal(ERR_RENDERING.PROJECTS_NAV);
    return;
  }
  if (!isHTMLElement(projectsList)) {
    showErrorModal(ERR_RENDERING.PROJECTS_LIST);
    return;
  }

  projectsList.setAttribute('current-projects-page', `${currentNum}`);
  projectsPageNav.textContent = `${currentNum} / ${totalNum}`;
}
