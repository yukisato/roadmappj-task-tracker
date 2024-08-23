import { Status, Task } from '@/types/task';
import { z } from 'zod';

export const updateStatusArgsSchema = z.tuple([
  z.string().transform((id) => parseInt(id)),
]);

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
  updateStatus(list, id, 'in-progress');
export const markDone = (list: Task[], id: number): Task[] =>
  updateStatus(list, id, 'done');
