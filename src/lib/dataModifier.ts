import { Task } from '@/types/task';
import path from 'node:path';
import fs from 'node:fs/promises';

export const dataFilePath = path.resolve(__dirname, '../.data.json');

export const writeTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(tasks), 'utf-8');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to write tasks');
  }
};
