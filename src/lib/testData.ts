import { Task } from '@/types/task';

export const todoTask: Task = {
  id: 1,
  description: 'task 1',
  status: 'todo',
  createdAt: '2022-01-01T00:00:00.000Z',
} as const;
export const inProgressTask: Task = {
  id: 2,
  description: 'task 2',
  status: 'in-progress',
  createdAt: '2022-01-01T00:00:01.000Z',
  updatedAt: '2022-01-01T00:00:02.000Z',
} as const;
export const doneTask: Task = {
  id: 3,
  description: 'task 3',
  status: 'done',
  createdAt: '2022-01-01T00:00:03.000Z',
  updatedAt: '2022-01-01T00:00:04.000Z',
} as const;
export const testData: Task[] = [todoTask, inProgressTask, doneTask] as const;
