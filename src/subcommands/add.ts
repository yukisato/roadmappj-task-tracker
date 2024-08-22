import { Task } from '@/types/task';

export const getNextId = (list: Task[]) =>
  list.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;

export const add = (list: Task[], description: string): Task[] => {
  return [
    ...list,
    {
      id: getNextId(list),
      description,
      status: 'todo',
      createdAt: new Date().toISOString(),
    },
  ];
};
