let projectsBarFooterNodes;
export function getProjectsBarFooterNodes() {
  if (projectsBarFooterNodes) {
    return projectsBarFooterNodes;
  }

  const projectsList = document.querySelector('.projects-list');
  const projectsBarFooter = document.querySelector('.projects-nav');
  const prevPageBtn = document.querySelector('.projects-previous-page');
  const projectsPageNav = document.querySelector('.projects-pages-nums');
  const nextPageBtn = projectsBarFooter.querySelector('.projects-next-page');

  projectsBarFooterNodes = {
    projectsList,
    prevPageBtn,
    projectsPageNav,
    nextPageBtn,
    projectsBarFooter,
  };

  return projectsBarFooterNodes;
}

let tasksBarFooterNodes;
export function getTasksBarFooterNodes() {
  if (tasksBarFooterNodes) {
    return tasksBarFooterNodes;
  }

  const tasksList = document.querySelector('.task-list');
  const tasksBarFooter = document.querySelector('main > .page-menu');
  const prevPageBtn = document.querySelector('.tasks-previous-page');
  const tasksPageNav = document.querySelector('.tasks-pages-nums');
  const nextPageBtn = tasksBarFooter.querySelector('.tasks-next-page');

  tasksBarFooterNodes = {
    tasksList,
    prevPageBtn,
    tasksPageNav,
    nextPageBtn,
    tasksBarFooter,
  };

  return tasksBarFooterNodes;
}
