import { Task } from '@/types/task';

export const remove = (list: Task[], id: number): Task[] =>
  list.filter((task) => task.id !== id);
