import { Task } from '@/types/task';

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
