let groupNodes;

export function getGroupNodes() {
  if (groupNodes) {
    return groupNodes;
  }

  const mainGroupName = document.querySelector('main .header h2');
  const mainGroupIcon = document.querySelector('main .header img');
  const taskList = document.querySelector('main .task-list');
  const addTaskIcon = document.querySelector('main .task-bar button.add-new');
  const sidebar = document.querySelector('aside');

  groupNodes = {
    mainGroupName,
    mainGroupIcon,
    taskList,
    addTaskIcon,
    sidebar,
  };

  return groupNodes;
}
