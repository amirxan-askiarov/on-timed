import {
  add, getYear, getMonth, getDate,
} from 'date-fns';

const now = new Date();
const year1 = now.getFullYear();
const month1 = now.getMonth() + 1;
const day1 = now.getDate();

const date = new Date(year1, month1, day1);

const result1 = add(date, {
  months: 1,
});

const result2 = add(date, {
  days: -4,
});

export const projectExample = {
  name: 'New project',
  iconURL: './assets/category-it.svg',
  altText: 'Category IT icon',
};

export const taskExample1 = {
  projectId: '1',
  title: 'Task example 1',
  dueDate: `${getYear(result1)}-${getMonth(result1).toString().padStart(2, '0')}-${getDate(result1).toString().padStart(2, '0')}`,
  priority: '2',
  description: '',
  notes: '',
};

export const taskExample2 = {
  projectId: '1',
  title: 'Task example 2',
  dueDate: `${getYear(result2)}-${getMonth(result2).toString().padStart(2, '0')}-${getDate(result2).toString().padStart(2, '0')}`,
  priority: '1',
  description: '',
  notes: '',
};
