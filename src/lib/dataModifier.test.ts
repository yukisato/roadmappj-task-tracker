import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { dataFilePath, readTasks, writeTasks } from './dataModifier';
import fs from 'node:fs/promises';
import { Task } from '@/types/task';

describe('writeTasks() writes a data to the JSON data file', () => {
  beforeEach(async () => {
    // Empty the data file.
    const fileHandle = await fs.open(dataFilePath, 'w');
    await fileHandle.close();
  });
  afterEach(async () => {
    // Empty the data file.
    const fileHandle = await fs.open(dataFilePath, 'w');
    await fileHandle.close();
  });

  it('should write a task list to the data file', async () => {
    const data: Task[] = [
      {
        id: 1,
        description: 'current task 1',
        status: 'todo',
        createdAt: '2022-01-01T00:00:00.000Z',
        updatedAt: '2022-01-01T00:00:00.000Z',
      },
    ];
    await writeTasks(data);
    const actual = await fs.readFile(dataFilePath, 'utf-8');
    assert.equal(actual, JSON.stringify(data));
  });

  it('should write an empty task list to the data file', async () => {
    const data: Task[] = [];
    await writeTasks(data);
    const actual = await fs.readFile(dataFilePath, 'utf-8');
    assert.equal(actual, JSON.stringify(data));
  });
});

describe('readTasks() reads a JSON file and returns a task list', () => {
  it('should read a task list from the data file', async () => {
    const data: Task[] = [
      {
        id: 1,
        description: 'current task 1',
        status: 'todo',
        createdAt: '2022-01-01T00:00:00.000Z',
        updatedAt: '2022-01-01T00:00:00.000Z',
      },
    ];
    await fs.writeFile(dataFilePath, JSON.stringify(data));
    const actual = await readTasks();
    assert.deepEqual(actual, data);
  });
});
