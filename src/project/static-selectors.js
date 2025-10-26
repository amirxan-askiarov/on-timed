let projectNodes;

export function getProjectNodes() {
  if (projectNodes) {
    return projectNodes;
  }
  const sidebar = document.querySelector('aside');
  const projectsList = document.querySelector('.projects-list');
  const tasksList = document.querySelector('.task-list');

  const projectsBar = document.querySelector('aside .bar-projects');
  const form = document.querySelector('.project-menu form');
  const exitButton = document.querySelector('.project-menu .exit');
  const cancelButton = document.querySelector('.project-menu .cancel');
  const optionsIconsContainer = document.querySelector('.project-menu .project-options');
  const allOptions = document.querySelectorAll('.project-menu .project-options > *');
  const inputsAllOptions = document.querySelectorAll('.project-menu .project-options input');
  const inputProjectName = document.querySelector('.project-menu #project-name');

  const menuCover = document.querySelector('.menu-cover');
  const menu = document.querySelector('.project-menu');
  const menuTitle = document.querySelector('.project-menu .title .title-text');
  const submitButton = document.querySelector('.project-menu .submit');

  const currentGroupIcon = document.querySelector('main .header img');
  const currentGroupName = document.querySelector('main .header h2');

  const removeMenu = document.querySelector('.remove-menu');
  const removeConfirm = document.querySelector('.remove-confirm');
  const removeHeading = document.querySelector('.remove-heading');
  const removeMessage = document.querySelector('.remove-message');

  projectNodes = {
    allOptions,
    optionsIconsContainer,
    projectsList,
    projectsBar,
    form,
    exitButton,
    cancelButton,
    menuCover,
    menu,
    menuTitle,
    submitButton,
    currentGroupIcon,
    currentGroupName,
    removeMenu,
    removeConfirm,
    removeHeading,
    removeMessage,
    inputsAllOptions,
    inputProjectName,
    sidebar,
    tasksList,
  };

  return projectNodes;
}
