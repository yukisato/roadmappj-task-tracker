import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { markDone, markInProgress } from './status';
import { Task } from '@/types/task';

describe('markInProgress() marks a task as in progress', () => {
  const initialList: Task[] = [
    {
      id: 1,
      description: 'task 1',
      status: 'todo',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
    },
    {
      id: 2,
      description: 'task 2',
      status: 'done',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
    },
  ];
  const targetId = 1;
  const updatedList = markInProgress(initialList, targetId);
  const updatedTask = updatedList[0];

  it('should update `task.status` to "in-progress"', () => {
    assert.equal(updatedTask?.status, 'in-progress');
  });

  it('should update updatedAt', () => {
    assert.notEqual(updatedTask?.updatedAt, initialList[0].updatedAt);
  });

  it('should not update other tasks', () => {
    const otherTaskId = 2;
    const expect = initialList.find((task) => task.id === otherTaskId);
    const actual = updatedList.find((task) => task.id === otherTaskId);
    assert.deepEqual(actual, expect);
  });
});

describe('markDone() marks a task as done', () => {
  const initialList: Task[] = [
    {
      id: 1,
      description: 'task 1',
      status: 'todo',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
    },
    {
      id: 2,
      description: 'task 2',
      status: 'in-progress',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
    },
  ];
  const targetId = 1;
  const updatedList = markDone(initialList, targetId);
  const updatedTask = updatedList[0];

  it('should update `task.status` to "done"', () => {
    assert.equal(updatedTask?.status, 'done');
  });

  it('should update updatedAt', () => {
    assert.notEqual(updatedTask?.updatedAt, initialList[0].updatedAt);
  });

  it('should not update other tasks', () => {
    const otherTaskId = 2;
    const expect = initialList.find((task) => task.id === otherTaskId);
    const actual = updatedList.find((task) => task.id === otherTaskId);
    assert.deepEqual(actual, expect);
  });
});
