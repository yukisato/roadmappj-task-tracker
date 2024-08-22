import { Status, Task } from '@/types/task';

export const display = (t: Task): void => {
  console.log(t.id, t.description, t.status, t.createdAt, t.updatedAt);
};

export const list = (list: Task[], status?: Status): void =>
  list
    .filter(({ status: s }) => !s || s === status)
    .forEach((task) => display(task));

export default { display, list };
