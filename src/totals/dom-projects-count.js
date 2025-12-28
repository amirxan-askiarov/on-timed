import { createErrorObj, eachIsHTMLElement, showErrorModal } from "../utils";
import { getProjectsBarHeaderNodes } from "./static-selectors";
import { ERR_RENDERING } from "./errors-text";

export function renderProjectsCount(projectsCount) {
  if (typeof projectsCount !== "number" || projectsCount === NaN) {
    const err = createErrorObj(ERR_RENDERING.PROJECTS_VALUES);
    showErrorModal(err);
    return;
  }

  const { emptyDiv, projectsBarHeader } = getProjectsBarHeaderNodes();
  if (!eachIsHTMLElement(emptyDiv, projectsBarHeader)) {
    const err = createErrorObj(ERR_RENDERING.PROJECTS_BAR);
    showErrorModal(err);
    return;
  }

  const oldProjectsNumber = document.querySelector(".projects-total");
  if (eachIsHTMLElement(oldProjectsNumber)) {
    oldProjectsNumber.remove();
  }

  const projectsNumber = document.createElement("span");
  projectsNumber.textContent = `(${projectsCount})`;
  projectsNumber.classList.add("projects-total");
  projectsBarHeader.insertBefore(projectsNumber, emptyDiv);
}
