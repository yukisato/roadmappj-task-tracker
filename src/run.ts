import { dummy } from './subcommands/dummy';
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
import { z } from 'zod';
import { readTasks, writeTasks } from './lib/dataModifier';
import { list, listArgsSchema, wrongStatusError } from './lib/displayHelper';

export const commands = [
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

export const run = async (command: Command, args: string[]) => {
  await executors[command](args);
};
