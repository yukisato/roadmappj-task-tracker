import { z } from 'zod';

export const statuses = ['todo', 'in-progress', 'done'] as const;
export type Status = (typeof statuses)[number];
export const statusEnumSchema = z.enum(statuses);
export const isStatus = (status: unknown): status is Status => {
  const { success } = statusEnumSchema.safeParse(status);
  return success;
};

export type Task = {
  id: number;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt?: string;
};
