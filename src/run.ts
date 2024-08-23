import { dummy } from './subcommands/dummy';
import { add, remove, update, markInProgress, markDone } from './subcommands';

const commands = {
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
export type Command = keyof typeof commands;
export const isCommand = (command: string): command is Command =>
  Object.keys(commands).includes(command);

export const run = (command?: string) => {
  if (!command) throw new Error('subcommand is not passed');
  if (command === 'none') throw new Error('invalid subcommand');
  if (command === 'dummy') return dummy();
};
