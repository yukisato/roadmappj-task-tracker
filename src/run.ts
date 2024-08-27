import {
  add,
  remove,
  update,
  markInProgress,
  markDone,
  addArgsSchema,
  updateArgsSchema,
  removeArgsSchema,
  updateStatusArgsSchema,
} from './subcommands';
import { readTasks, writeTasks } from './lib/dataModifier';
import { list, listArgsSchema, wrongStatusError } from './lib/displayHelper';
import { MissingCommandError, WrongCommandError } from './lib/error';
import { Command, isCommand } from './types/command';

export type Executor = (args: string[]) => Promise<void>;
const executors: Record<Command, Executor> = {
  add: async (args: string[]) => {
    const { data } = addArgsSchema.safeParse(args);
    if (data) await writeTasks(add(...[await readTasks(), ...data]));
  },
  update: async (args: string[]) => {
    const { data } = updateArgsSchema.safeParse(args);
    if (data) await writeTasks(update(...[await readTasks(), ...data]));
  },
  delete: async (args: string[]) => {
    const { data } = removeArgsSchema.safeParse(args);
    if (data) await writeTasks(remove(...[await readTasks(), ...data]));
  },
  'mark-in-progress': async (args: string[]) => {
    const { data } = updateStatusArgsSchema.safeParse(args);
    if (data) await writeTasks(markInProgress(...[await readTasks(), ...data]));
  },
  'mark-done': async (args: string[]) => {
    const { data } = updateStatusArgsSchema.safeParse(args);
    if (data) await writeTasks(markDone(...[await readTasks(), ...data]));
  },
  list: async (args: string[]) => {
    const { success, data } = listArgsSchema.safeParse(args);
    if (!success) throw wrongStatusError;
    if (data) {
      list(...[await readTasks(), ...data]);
    } else {
      list(await readTasks());
    }
  },
} as const;

export const run = async (argv: string[]) => {
  const [, , subcommand, ...args] = argv;
  if (!subcommand) throw new MissingCommandError();
  if (!isCommand(subcommand)) throw new WrongCommandError();

  await executors[subcommand](args);
};
