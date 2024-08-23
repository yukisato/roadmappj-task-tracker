import { Status, Task } from '@/types/task';

export const updateStatus = (
  list: Task[],
  id: number,
  status: Status
): Task[] =>
  list.map((task) =>
    task.id !== id
      ? task
      : {
          ...task,
          status,
          updatedAt: new Date().toISOString(),
        }
  );

export const markInProgress = (list: Task[], id: number): Task[] =>
  list.map((task) =>
    task.id !== id
      ? task
      : { ...task, status: 'in-progress', updatedAt: new Date().toISOString() }
  );

export const markDone = (list: Task[], id: number): Task[] =>
  list.map((task) =>
    task.id !== id
      ? task
      : { ...task, status: 'done', updatedAt: new Date().toISOString() }
  );
