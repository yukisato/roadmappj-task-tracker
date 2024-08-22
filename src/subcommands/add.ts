import { Task } from '@/types/task';

export const add = (list: Task[], description: string): Task[] => {
  const id = list.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
  return [
    ...list,
    {
      id,
      description,
      status: 'todo',
      createdAt: new Date().toISOString(),
    },
  ];
};
