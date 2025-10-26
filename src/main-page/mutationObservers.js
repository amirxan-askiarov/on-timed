import { showErrorModal, isHTMLElement } from '../utils';

export function initializeFocusModules() {
  const projectMenu = document.querySelector('.project-menu');
  const projectNameInput = document.querySelector('.project-menu #project-name');
  const taskMenu = document.querySelector('.task-menu');
  const taskTitleInput = document.querySelector('.task-menu #task-title');
  const removeMenu = document.querySelector('.remove-menu');
  const removeMenuBtnCancel = document.querySelector('.remove-menu .button-box .exit');
  const errorModal = document.querySelector('.error-modal');
  const errorModalBtnOk = document.querySelector('.error-modal .button-box .exit-ok');
  if (!isHTMLElement(projectMenu)
        || !isHTMLElement(taskMenu)
        || !isHTMLElement(removeMenu)
        || !isHTMLElement(errorModal)
        || !isHTMLElement(projectNameInput)
        || !isHTMLElement(taskTitleInput)
        || !isHTMLElement(removeMenuBtnCancel)
        || !isHTMLElement(errorModalBtnOk)
  ) {
    showErrorModal(['Application error', 'One or more of the menus components couldn\'t be found', 'Process: applying the observer modules on the menus']);
    return;
  }

  const applyFocus = (element) => element.focus();
  const isNotHidden = (element) => window.getComputedStyle(element).getPropertyValue('display') !== 'none';

  let focusAppliedProjectMenu = false;
  let focusAppliedTaskMenu = false;
  let focusAppliedRemoveMenu = false;
  let focusAppliedErrorModal = false;

  const projectMenuFocusApplier = new MutationObserver(() => {
    if (isNotHidden(projectMenu) && !focusAppliedProjectMenu) {
      applyFocus(projectNameInput);
      focusAppliedProjectMenu = true;
    } else {
      focusAppliedProjectMenu = false;
    }
  });
  const taskMenuFocusApplier = new MutationObserver(() => {
    if (isNotHidden(taskMenu) && !focusAppliedTaskMenu) {
      applyFocus(taskTitleInput);
      focusAppliedTaskMenu = true;
    } else {
      focusAppliedTaskMenu = false;
    }
  });
  const removeMenuFocusApplier = new MutationObserver(() => {
    if (isNotHidden(removeMenu) && !focusAppliedRemoveMenu) {
      applyFocus(removeMenuBtnCancel);
      focusAppliedRemoveMenu = true;
    } else {
      focusAppliedRemoveMenu = false;
    }
  });
  const errorModalFocusApplier = new MutationObserver(() => {
    if (isNotHidden(errorModal) && !focusAppliedErrorModal) {
      applyFocus(errorModalBtnOk);
      focusAppliedErrorModal = true;
    } else {
      focusAppliedErrorModal = false;
    }
  });

  projectMenuFocusApplier.observe(projectMenu, { subtree: true, childList: true });
  taskMenuFocusApplier.observe(taskMenu, { subtree: true, childList: true });
  removeMenuFocusApplier.observe(removeMenu, { subtree: true, childList: true });
  errorModalFocusApplier.observe(errorModal, { subtree: true, childList: true });

  return {
    projectMenuFocusApplier,
    taskMenuFocusApplier,
    removeMenuFocusApplier,
    errorModalFocusApplier,
  };
}
