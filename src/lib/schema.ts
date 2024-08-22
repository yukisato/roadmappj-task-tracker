import { z } from 'zod';

export const taskSchema = z
  .object({
    id: z.number(),
    description: z.string(),
    status: z.enum(['todo', 'in-progress', 'done']),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
  })
  .strict();
export const taskListSchema = z.array(taskSchema);
