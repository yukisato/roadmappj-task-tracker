import { z } from 'zod';

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
