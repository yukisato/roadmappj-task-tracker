import { Task } from '@/types/task';
import { z } from 'zod';

export const updateArgsSchema = z.tuple([
  z.string().transform((id) => parseInt(id)),
  z.string(),
]);

export const update = (
  list: Task[],
  id: number,
  description: string
): Task[] => {
  const task = list.find((task) => task.id === id);
  if (!task) return list;
  return list.map((task) =>
    task.id !== id
      ? task
      : {
          ...task,
          description,
          updatedAt: new Date().toISOString(),
        }
  );
};
