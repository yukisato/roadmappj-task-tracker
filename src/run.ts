import { dummy } from './subcommands/dummy';
import { add, remove, update, markInProgress, markDone } from './subcommands';
import { z } from 'zod';

const commands = [
  'add',
  'update',
  'delete',
  'mark-in-progress',
  'mark-done',
  'list',
] as const;
export type Command = (typeof commands)[number];
export const commandSchema = z.enum(commands);
export const isCommand = (command: unknown): command is Command =>
  commandSchema.safeParse(command).success;

const executors = {
  add: {
    run: add,
  },
  update: {
    run: update,
  },
  remove: {
    run: remove,
  },
  'in-progress': {
    run: markInProgress,
  },
  done: {
    run: markDone,
  },
} as const;

export const run = (command?: string) => {
  if (!command) throw new Error('subcommand is not passed');
  if (command === 'none') throw new Error('invalid subcommand');
  if (command === 'dummy') return dummy();
};
