import { Task } from '@/types/task';
import path from 'node:path';
import fs from 'node:fs/promises';
import { taskListSchema } from './schema';

export const dataFilePath = path.resolve(__dirname, '../.data.json');

export const emptyData = async (): Promise<void> => {
  const fileHandle = await fs.open(dataFilePath, 'w');
  await fileHandle.close();
};

export const readTasks = async (): Promise<Task[]> =>
  await taskListSchema.parseAsync(
    JSON.parse(await fs.readFile(dataFilePath, 'utf-8'))
  );

export const writeTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(tasks), 'utf-8');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to write tasks');
  }
};
