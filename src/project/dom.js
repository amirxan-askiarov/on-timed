import {
  createElementWithAttributes, showErrorModal, ACTIONS_PROJECTS, isHTMLElement, isValid,
} from '../utils';
import { getProjectNodes } from './static-selectors';
import { assets } from './assets';
import { ERR_RENDERING } from './errors-text';

export function renderProject(project) {
  const { projectsList } = getProjectNodes();
  const {
    id, name, iconURL, altText,
  } = project;

  if (!isHTMLElement(projectsList)) {
    showErrorModal(ERR_RENDERING.PROJECT_LIST_PANEL);
    return;
  }
  if (!isValid(id) || !isValid(name) || !isValid(iconURL) || !isValid(altText)) {
    showErrorModal(ERR_RENDERING.PROJECT_VALUES);
    return;
  }

  const nodeNewProject = createElementWithAttributes('li', {
    class: 'project',
    tabindex: 0,
  }, projectsList);
  nodeNewProject.setAttribute('data-group-id', `${id}`);

  const projectImage = createElementWithAttributes('img', {
    alt: `${altText}`,
    src: `${iconURL}`,
  }, nodeNewProject);

  const newProjectText = createElementWithAttributes('span', {}, nodeNewProject);
  newProjectText.textContent = name;

  const newProjectEditImage = createElementWithAttributes('button', {
    class: 'edit non-select',
  }, nodeNewProject);
  newProjectEditImage.ariaLabel = 'Edit project';
  newProjectEditImage.style.backgroundImage = `url(${assets.newProjectEditImagePath})`;
  newProjectEditImage.setAttribute('data-project-action', ACTIONS_PROJECTS.EDIT);

  const newProjectDeleteImage = createElementWithAttributes('button', {
    class: 'remove non-select',
  }, nodeNewProject);
  newProjectDeleteImage.ariaLabel = 'Remove project';
  newProjectDeleteImage.style.backgroundImage = `url(${assets.newProjectDeleteImagePath})`;
  newProjectDeleteImage.setAttribute('data-project-action', ACTIONS_PROJECTS.REMOVE);
}
