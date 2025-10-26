import { isHTMLElement, showErrorModal } from '../utils';
import { getProjectsBarHeaderNodes } from './static-selectors';
import { ERR_RENDERING } from './errors-text';

export function renderProjectsCount(projectsCount) {
  if (typeof projectsCount !== 'number' || projectsCount === NaN) {
    showErrorModal(ERR_RENDERING.PROJECTS_VALUES);
    return;
  }

  const { emptyDiv, projectsBarHeader } = getProjectsBarHeaderNodes();
  if (!isHTMLElement(emptyDiv) || !isHTMLElement(projectsBarHeader)) {
    showErrorModal(ERR_RENDERING.PROJECTS_BAR);
    return;
  }

  const oldProjectsNumber = document.querySelector('.projects-total');
  if (isHTMLElement(oldProjectsNumber)) {
    oldProjectsNumber.remove();
  }

  const projectsNumber = document.createElement('span');
  projectsNumber.textContent = `(${projectsCount})`;
  projectsNumber.classList.add('projects-total');
  projectsBarHeader.insertBefore(projectsNumber, emptyDiv);
}
