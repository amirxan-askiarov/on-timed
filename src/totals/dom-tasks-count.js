import { createErrorObj, eachIsHTMLElement, showErrorModal } from "../utils";
import { getTasksBarHeaderNodes } from "./static-selectors";
import { ERR_RENDERING } from "./errors-text";

export function renderTasksCount(tasksCount) {
  if (typeof tasksCount !== "number" || tasksCount === NaN) {
    const err = createErrorObj(ERR_RENDERING.TASKS_VALUES);
    showErrorModal(err);
    return;
  }

  const { tasksNumberBox } = getTasksBarHeaderNodes();
  if (!eachIsHTMLElement(tasksNumberBox)) {
    const err = createErrorObj(ERR_RENDERING.TASKS_BAR);
    showErrorModal(err);
    return;
  }

  const oldTasksNumber = document.querySelector(".tasks-total");
  if (eachIsHTMLElement(oldTasksNumber)) {
    oldTasksNumber.remove();
  }

  const tasksNumber = document.createElement("span");
  tasksNumber.classList.add("tasks-total");
  tasksNumber.textContent = `(${tasksCount})`;
  tasksNumberBox.appendChild(tasksNumber);
}
