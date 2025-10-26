let taskNodes;

export function getTaskNodes() {
  if (taskNodes) {
    return taskNodes;
  }

  const taskList = document.querySelector('.task-list');
  const sidebar = document.querySelector('aside');

  const main = document.querySelector('main');
  const form = document.querySelector('.task-menu form');

  const exitButton = document.querySelector('.task-menu .exit');
  const cancelButton = document.querySelector('.task-menu .cancel');

  const menu = document.querySelector('.task-menu');
  const menuCover = document.querySelector('.menu-cover');

  const menuTitle = document.querySelector('.task-menu .title .title-text');
  const submitButton = document.querySelector('.task-menu .submit');

  const titleInput = document.querySelector('.task-menu #task-title');
  const allPriorityInputs = document.querySelectorAll('.task-menu .priority input');
  const dueDateInput = document.querySelector('.task-menu #task-dueDate');
  const descriptionInput = document.querySelector('.task-menu #task-description');
  const notesInput = document.querySelector('.task-menu #task-notes');

  const removeMenu = document.querySelector('.remove-menu');
  const removeConfirm = document.querySelector('.remove-confirm');
  const removeHeading = document.querySelector('.remove-heading');
  const removeMessage = document.querySelector('.remove-message');

  taskNodes = {
    taskList,
    sidebar,
    main,
    form,
    exitButton,
    cancelButton,
    menu,
    menuCover,
    menuTitle,
    submitButton,
    titleInput,
    dueDateInput,
    descriptionInput,
    notesInput,
    removeMenu,
    removeConfirm,
    removeHeading,
    removeMessage,
    allPriorityInputs,
  };

  return taskNodes;
}
