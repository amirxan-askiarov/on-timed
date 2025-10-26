import { renderMainPage } from './main-page/dom-main-page';
import { renderProject } from './project/dom';
import { renderGroup } from './group/dom';
import { renderProjectsCount } from './totals/dom-projects-count';
import { renderTasksCount } from './totals/dom-tasks-count';
import { renderProjectsPageNav } from './pages-navs/projects-pages-dom';
import { renderTasksPageNav } from './pages-navs/tasks-pages-dom';

import { addListenersSidebar } from './group/event-listeners';
import { addListenersViewOptions } from './view-options/event-listeners';
import { addListenersManageProjects } from './project/event-listeners';
import { addListenersManageTasks } from './task/event-listeners';
import { addListenersProjectsPagesNav } from './pages-navs/event-listeners-projects';
import { addListenersTasksPagesNav } from './pages-navs/event-listeners-tasks';
import { applySavedViewState } from './view-options/dom';

import { projectsController } from './project/controller';
import { tasksController } from './task/controller';
import { groupsController } from './group/controller';
import { viewController } from './view-options/controller';
import { localStorageController } from './controller-local-storage';
import { projectsPageController, tasksPageController } from './pages-navs/pages-controller';
import { initializeFocusModules } from './main-page/mutationObservers';

import {
  STANDARD_GROUPS, DEFAULT_PAGE, DEFAULT_GROUP, DEFAULT_ID,
} from './utils';
import { projectExample, taskExample1, taskExample2 } from './main-page/examples';

class Application {
  constructor() {
    if (Application.instance) {
      return Application.instance;
    }
    Application.instance = this;
  }

  start() {
    renderMainPage();

    addListenersSidebar(this);
    addListenersManageProjects(this);
    addListenersViewOptions(this);
    addListenersManageTasks(this);
    addListenersProjectsPagesNav(this);
    addListenersTasksPagesNav(this);
    applySavedViewState(this);

    let { projectsList, listStored } = localStorageController.getProjectsList();
    if (!listStored) {
      localStorageController.setProjectId(DEFAULT_ID);
      this.createNewProject(projectExample, DEFAULT_PAGE);

      const taskId = DEFAULT_ID;
      localStorageController.setTaskId(Number(taskId));
      this.createNewTask(taskExample1, DEFAULT_PAGE);
      localStorageController.setTaskId(Number(taskId) + 1);
      this.createNewTask(taskExample2, DEFAULT_PAGE);
      localStorageController.setTaskId(Number(taskId) + 2);

      const { projectsList: newProjectsList } = localStorageController.getProjectsList();
      projectsList = newProjectsList;
    }

    renderProjectsCount(projectsList.length);


    projectsPageController.getPageItems(DEFAULT_PAGE, projectsList)
      .forEach((project) => renderProject(project));

    renderProjectsPageNav(DEFAULT_PAGE, projectsPageController.pagesTotal(projectsList));

    localStorageController.setCurrentGroupIdentifier(DEFAULT_GROUP);
    const defaultGroupId = localStorageController.getCurrentGroupIdentifier();
    const defaultFilteredSortedGroup = this.applyViewOptions(
      localStorageController.getViewState(),
      this.getTasksGroup(defaultGroupId),
      DEFAULT_PAGE,
    );

    renderTasksCount(defaultFilteredSortedGroup.length);
    renderTasksPageNav(DEFAULT_PAGE, tasksPageController.pagesTotal(defaultFilteredSortedGroup));

    const defaultTasksFirstPage = tasksPageController
      .getPageItems(DEFAULT_PAGE, defaultFilteredSortedGroup);
    renderGroup(defaultTasksFirstPage, defaultGroupId);

    initializeFocusModules();
  }

  createNewProject(inputNewProject, currentProjectsPage) {
    const { projectsList } = localStorageController.getProjectsList();

    const currentPageLength = projectsPageController
      .getPageItems(currentProjectsPage, projectsList).length;

    const projectId = localStorageController.getProjectId();
    const newProjectsList = projectsController.createNew(projectId, projectsList, inputNewProject);
    if (newProjectsList === -1) {
      return -1;
    }

    localStorageController.setProjectId(Number(projectId) + 1);
    const newLength = newProjectsList.length;
    const newProject = newProjectsList[newLength - 1];

    localStorageController.setProjectsList(newProjectsList);
    localStorageController.addTaskList(newProject.id);

    renderProjectsCount(newLength);
    renderProjectsPageNav(currentProjectsPage, projectsPageController.pagesTotal(newProjectsList));

    return { newProject, currentPageLength };
  }

  editProject(inputEditedProject) {
    const { projectsList } = localStorageController.getProjectsList();

    const result = projectsController.edit(projectsList, inputEditedProject);
    if (result === -1) {
      return -1;
    }
    const { editedProjectsList, editedProject } = result;

    localStorageController.setProjectsList(editedProjectsList);

    const currentTasksList = localStorageController.getTasksListByProjectId(editedProject.id);
    const editedTasksList = tasksController.updateProjectName(currentTasksList, editedProject.name);

    localStorageController.setTasksListByProjectId(editedProject.id, editedTasksList);

    return editedProject;
  }

  removeProject(projectId, currentProjectsPageNumber, currentProjectPageLength, groupId) {
    let newProjectsPageNumber = currentProjectsPageNumber;
    const { projectsList } = localStorageController.getProjectsList();

    if (currentProjectPageLength === 1) {
      newProjectsPageNumber -= 1;
    }

    const { editedProjectsList, removedId } = projectsController.remove(projectsList, projectId);

    localStorageController.removeTaskList(removedId);
    localStorageController.setProjectsList(editedProjectsList);

    const viewState = this.getViewState();
    const newFilteredSortedGroup = this
      .applyViewOptions(viewState, this.getTasksGroup(groupId));

    const newProjectsPageView = projectsPageController
      .getPageItems(newProjectsPageNumber, editedProjectsList);
    const newTasksPageView = tasksPageController.getPageItems(DEFAULT_PAGE, newFilteredSortedGroup);

    renderProjectsCount(editedProjectsList.length);
    renderTasksCount(newFilteredSortedGroup.length);

    renderProjectsPageNav(
      newProjectsPageNumber,
      projectsPageController.pagesTotal(editedProjectsList),
    );
    renderTasksPageNav(DEFAULT_PAGE, tasksPageController.pagesTotal(newFilteredSortedGroup));

    return { newTasksPageView, newProjectsPageView };
  }

  createNewTask(inputNewTask, currentTasksPage) {
    const { projectId } = inputNewTask;
    const projectName = localStorageController.getProjectName(projectId);

    const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
    const currentPageLength = tasksPageController
      .getPageItems(currentTasksPage, currentTasksList).length;

    const taskId = localStorageController.getTaskId();
    const result = tasksController.createNew(taskId, currentTasksList, projectName, inputNewTask);
    if (result === -1) {
      return -1;
    }
    const { newTasksList, newTask } = result;

    localStorageController.setTaskId(Number(taskId) + 1);
    localStorageController.setTasksListByProjectId(projectId, newTasksList);

    renderTasksCount(newTasksList.length);
    renderTasksPageNav(currentTasksPage, tasksPageController.pagesTotal(newTasksList));

    return { newTask, currentPageLength };
  }

  editTask(inputEditedTask) {
    const { projectId } = inputEditedTask;

    const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
    const result = tasksController.edit(currentTasksList, inputEditedTask);
    if (result === -1) {
      return -1;
    }
    const { editedTasksList, editedTask } = result;


    localStorageController.setTasksListByProjectId(projectId, editedTasksList);

    return editedTask;
  }

  toggleTaskStatus(projectId, taskId) {
    const currentTasksList = localStorageController.getTasksListByProjectId(projectId);
    const { editedTasksList, editedStatus } = tasksController
      .toggleTaskStatus(currentTasksList, taskId);

    localStorageController.setTasksListByProjectId(projectId, editedTasksList);

    return editedStatus;
  }

  removeTask(projectId, taskId, currentTasksPage, currentTasksPageLength) {
    let newTasksPageNumber = currentTasksPage;
    const currentTasksList = localStorageController.getTasksListByProjectId(projectId);

    if (currentTasksPageLength === 1) {
      newTasksPageNumber -= 1;
    }

    const { editedTaskList } = tasksController.remove(currentTasksList, taskId);

    localStorageController.setTasksListByProjectId(projectId, editedTaskList);

    const viewState = this.getViewState();
    const newFilteredSortedGroup = this
      .applyViewOptions(viewState, null, newTasksPageNumber);

    const newTasksPageView = tasksPageController
      .getPageItems(newTasksPageNumber, newFilteredSortedGroup);

    renderTasksCount(newFilteredSortedGroup.length);
    renderTasksPageNav(newTasksPageNumber, tasksPageController.pagesTotal(editedTaskList));

    return { newTasksPageView };
  }

  getTasksGroup(newGroupIdentifier) {
    let newGroup;

    if (Object.values(STANDARD_GROUPS).includes(newGroupIdentifier)) {
      const allTasks = localStorageController.getAllTasks();
      newGroup = groupsController.getTaskListByGroup(allTasks, newGroupIdentifier);
    } else {
      newGroup = localStorageController.getTasksListByProjectId(newGroupIdentifier);
    }

    localStorageController.setCurrentGroupIdentifier(newGroupIdentifier);

    return newGroup;
  }

  getViewState() {
    return localStorageController.getViewState();
  }

  applyViewOptions(viewState, tasksGroup, currentTasksPage) {
    localStorageController.setViewState(viewState);
    let group = tasksGroup;
    if (!group) {
      group = this.getTasksGroup(localStorageController.getCurrentGroupIdentifier());
    }

    const filteredTasks = viewController.filter(group, viewState);
    const filteredSortedTasks = viewController.sort(filteredTasks, viewState);

    renderTasksCount(filteredSortedTasks.length);

    let tasksPage;
    if (!currentTasksPage) {
      tasksPage = tasksPageController.getPageItems(DEFAULT_PAGE, filteredSortedTasks);
      renderTasksPageNav(DEFAULT_PAGE, tasksPageController.pagesTotal(filteredSortedTasks));
      return tasksPage;
    }

    renderTasksPageNav(currentTasksPage, tasksPageController.pagesTotal(filteredSortedTasks));
    return filteredSortedTasks;
  }

  moveProjectsPageForward(projectsPageNumber) {
    const { projectsList } = localStorageController.getProjectsList();
    const { newPageNumber, newPage } = projectsPageController
      .movePageForward(projectsPageNumber, projectsList);
    renderProjectsPageNav(newPageNumber, projectsPageController.pagesTotal(projectsList));
    return { newPage, newPageNumber };
  }

  moveProjectsPageBackwards(projectsPageNumber) {
    const { projectsList } = localStorageController.getProjectsList();
    const { newPageNumber, newPage } = projectsPageController
      .movePageBackwards(projectsPageNumber, projectsList);
    renderProjectsPageNav(newPageNumber, projectsPageController.pagesTotal(projectsList));
    return { newPage, newPageNumber };
  }

  moveTasksPageForward(tasksPageNumber) {
    const currentFilteredSortedGroup = this
      .applyViewOptions(this.getViewState(), null, tasksPageNumber);
    const { newPageNumber, newPage } = tasksPageController
      .movePageForward(tasksPageNumber, currentFilteredSortedGroup);
    renderTasksPageNav(newPageNumber, tasksPageController.pagesTotal(currentFilteredSortedGroup));
    return { newPage, newPageNumber };
  }

  moveTasksPageBackwards(tasksPageNumber) {
    const currentFilteredSortedGroup = this
      .applyViewOptions(this.getViewState(), null, tasksPageNumber);
    const { newPageNumber, newPage } = tasksPageController
      .movePageBackwards(tasksPageNumber, currentFilteredSortedGroup);
    renderTasksPageNav(newPageNumber, tasksPageController.pagesTotal(currentFilteredSortedGroup));
    return { newPage, newPageNumber };
  }
}

export const application = new Application();
