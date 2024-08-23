import { Task } from '@/types/task';
import { z } from 'zod';

export const removeArgsSchema = z.tuple([
  z.string().transform((id) => parseInt(id)),
]);

export const remove = (list: Task[], id: number): Task[] =>
  list.filter((task) => task.id !== id);
