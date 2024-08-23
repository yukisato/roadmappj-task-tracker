import { isStatus, Status, statuses, Task } from '../types/task';
import { z } from 'zod';

export const wrongStatusError = new TypeError(
  `Given status is invalid. Use (${statuses.join('|')}).`
);
export const listArgsSchema = z.union([
  z.tuple([]),
  z.tuple([
    z.string().transform((status) => {
      if (isStatus(status)) return status;
      throw wrongStatusError;
    }),
  ]),
]);

export const display = (t: Task): void => {
  console.log(t.id, t.description, t.status, t.createdAt, t.updatedAt);
};

export const list = (list: Task[], status?: Status): void =>
  list
    .filter(({ status: s }) => !status || s === status)
    .forEach((task) => display(task));

export default { display, list };
