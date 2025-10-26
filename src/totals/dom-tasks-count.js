import { isHTMLElement, showErrorModal } from '../utils';
import { getTasksBarHeaderNodes } from './static-selectors';
import { ERR_RENDERING } from './errors-text';

export function renderTasksCount(tasksCount) {
  if ((typeof tasksCount !== 'number' || tasksCount === NaN)) {
    showErrorModal(ERR_RENDERING.TASKS_VALUES);
    return;
  }

  const { tasksNumberBox } = getTasksBarHeaderNodes();
  if (!isHTMLElement(tasksNumberBox)) {
    showErrorModal(ERR_RENDERING.TASKS_BAR);
    return;
  }

  const oldTasksNumber = document.querySelector('.tasks-total');
  if (isHTMLElement(oldTasksNumber)) {
    oldTasksNumber.remove();
  }

  const tasksNumber = document.createElement('span');
  tasksNumber.classList.add('tasks-total');
  tasksNumber.textContent = `(${tasksCount})`;
  tasksNumberBox.appendChild(tasksNumber);
}
