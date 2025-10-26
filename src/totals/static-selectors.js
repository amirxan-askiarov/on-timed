let projectsBarHeaderNodes;
export function getProjectsBarHeaderNodes() {
  if (projectsBarHeaderNodes) {
    return projectsBarHeaderNodes;
  }

  const emptyDiv = document.querySelector('.bar-projects > .header > div');
  const projectsBarHeader = document.querySelector('.bar-projects > .header');

  projectsBarHeaderNodes = {
    emptyDiv,
    projectsBarHeader,
  };

  return projectsBarHeaderNodes;
}

let tasksBarHeaderNodes;
export function getTasksBarHeaderNodes() {
  if (tasksBarHeaderNodes) {
    return tasksBarHeaderNodes;
  }

  const tasksNumberBox = document.querySelector('.task-bar > .task-number');

  tasksBarHeaderNodes = {
    tasksNumberBox,
  };

  return tasksBarHeaderNodes;
}
