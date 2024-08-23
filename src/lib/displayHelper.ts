import { isStatus, Status, statuses, Task } from '../types/task';
import { z } from 'zod';
import Table from 'cli-table3';

export const wrongStatusError = new TypeError(
  `Given status is invalid. Use (${statuses.join('|')}).`
);
export const listArgsSchema = z.union([
  z.tuple([]).transform(() => undefined),
  z.tuple([
    z.string().transform((status) => {
      if (isStatus(status)) return status;
      throw wrongStatusError;
    }),
  ]),
]);

export const list = (list: Task[], status?: Status): void => {
  let table = new Table({
    head: ['id', 'description', 'status', 'createdAt', 'updatedAt'],
    style: {
      head: [],
      border: [],
    },
  });

  list
    .filter(({ status: s }) => !status || s === status)
    .forEach((t) => {
      table.push([
        t.id,
        t.description,
        t.status,
        t.createdAt,
        t.updatedAt ?? '',
      ]);
    });

  console.log(table.toString());
};
