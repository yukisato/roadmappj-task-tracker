import { Task } from '@/types/task';
import path from 'node:path';
import fs from 'node:fs';

export const dataFilePath = path.resolve(__dirname, '../.data.json');

export const writeTasks = (tasks: Task[]): void => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks), 'utf-8');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to write tasks');
  }
};
