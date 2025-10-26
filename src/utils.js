// eslint-disable-next-line default-param-last
export function createElementWithAttributes(tagName, attributes = {}, parentElement) {
  const element = document.createElement(tagName);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (parentElement) {
    parentElement.appendChild(element);
  }

  return element;
}

export function showErrorModal(message) {
  if (!Array.isArray(message)) {
    showErrorModal(['Application error', 'Heading and/or error message couldn\'t be found', 'Process: rendering error modal']);
    return;
  }

  const errorModal = document.querySelector('.error-modal');
  const messageHeading = errorModal.querySelector('.error-heading');
  const messagePara = errorModal.querySelector('.error-message');
  const process = errorModal.querySelector('.error-process');
  const errorCover = document.querySelector('.error-cover');

  if (isValid(message[0])) {
    messageHeading.textContent = message[0];
  } else {
    messageHeading.textContent = 'Invalid input';
  }

  errorModal.classList.add('shown');
  errorCover.classList.add('shown');
  messagePara.textContent = message[1];
  process.textContent = message[2];
}

export function handleExitRemoveMenu(e) {
  if (isPressedKey(e)) {
    const menuCover = document.querySelector('.menu-cover');
    const removeMenu = document.querySelector('.remove-menu');
    const heading = document.querySelector('.remove-menu .remove-heading');
    const message = document.querySelector('.remove-menu .remove-message');

    if (!isHTMLElement(menuCover)
      || !isHTMLElement(removeMenu)
      || !isHTMLElement(heading)
      || !isHTMLElement(message)
    ) {
      showErrorModal(['Application error', 'One or more menu components couldn\'t be found', 'Process: exiting the remove confirmation menu']);
      return;
    }

    removeMenu.classList.remove('shown');
    menuCover.classList.remove('shown');
    heading.textContent = '';
    message.textContent = '';

    removeMenu.project = null;
    removeMenu.task = null;
    removeMenu.setAttribute('data-project-id', null);
    removeMenu.setAttribute('data-task-id', null);
    removeMenu.setAttribute('data-task-action', null);
    removeMenu.setAttribute('data-project-action', null);
  }
}

export function convertPriorityCodeToText(priority) {
  switch (priority) {
    case '0': {
      return 'Normal';
    }
    case '1': {
      return 'Medium';
    }
    case '2': {
      return 'High';
    }
    default:
      return undefined;
  }
}

export const removeCurrentStatus = (element) => element.removeAttribute('data-value');

export const isPressedKey = (e) => e.type === 'click' || (e.type === 'keydown' && e.code === 'Enter');

export function isNodeList(element) {
  return element instanceof NodeList;
}

export function isHTMLElement(element) {
  return element instanceof HTMLElement || element instanceof Element;
}

export function isObject(obj) {
  return obj instanceof Object;
}

export function isBoolean(value) {
  return typeof value === 'boolean';
}

export function isReal(value) {
  return value !== undefined && value !== null;
}

export function isValid(value) {
  return value !== undefined && value !== null && value !== '' && value !== false;
}

export function isNotEmpty(value) {
  return value !== '';
}

export function checkIfCurrent(element) {
  if (element.getAttribute('data-value') === 'current') {
    return true;
  }
  return false;
}

export function noDuplicateName(list, name, id) {
  const n = list.length;
  let i = 0;
  for (; i < n; i += 1) {
    if (Number(list[i].id) === Number(id)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (list[i].name === name) {
      return false;
    }
  }
  return true;
}

export function noDuplicateTitle(list, title, id) {
  const n = list.length;
  let i = 0;
  for (; i < n; i += 1) {
    if (Number(list[i].id) === Number(id)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (list[i].title === title) {
      return false;
    }
  }
  return true;
}

export function findIndex(list, id) {
  let index;
  const n = list.length;
  let i = 0;
  for (; i < n; i += 1) {
    if (Number(list[i].id) === Number(id)) {
      index = i;
      break;
    }
  }
  return index;
}

export function Enum(baseEnum) {
  return new Proxy(baseEnum, {
    get(target, name) {
      // eslint-disable-next-line no-prototype-builtins
      if (!baseEnum.hasOwnProperty(name)) {
        throw new Error(`"${name}" value does not exist in the enum`);
      }
      return baseEnum[name];
    },
    set(target, name, value) {
      throw new Error('Cannot add a new value to the enum');
    },
  });
}

export const DEFAULT_ID = 1;
export const DEFAULT_PAGE = 1;
export const DEFAULT_GROUP = 'all';

export const NUM_PROJECTS_PAGE = 3;
export const NUM_TASKS_PAGE = 6;

export const SUBMIT_THROTTLE_TIME = 250;
export const KEYPRESS_THROTTLE_TIME = 125;

export const ACTIONS_PROJECTS = new Enum({
  ADD_NEW: 'add-new',
  EDIT: 'edit',
  REMOVE: 'remove',
});

export const ACTIONS_TASKS = new Enum({
  ADD_NEW: 'add-new',
  EDIT: 'edit',
  UPDATE_STATUS: 'update-status',
  REMOVE: 'remove',
  UNFOLD: 'unfold',
});

export const STANDARD_GROUPS = {
  ALL: 'all',
  TODAY: 'today',
  WEEK: 'week',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
};

export const PRIORITY = {
  NORMAL: '0',
  MEDIUM: '1',
  HIGH: '2',
};

export const SORTBY = {
  DATE: 'date',
  STATUS: 'status',
  PRIORITY: 'priority',
};

export const STATUS = {
  COMPLETED: '0',
  ONGOING: '1',
  OVERDUE: '2',
};
