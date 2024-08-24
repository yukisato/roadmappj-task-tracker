import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import {
  markDone,
  markInProgress,
  updateStatus,
  updateStatusArgsSchema,
} from './status';
import { Task } from '@/types/task';
import { doneTask, inProgressTask, todoTask } from '../lib/testData';

describe('updateStatus() updates updates a status of a task', () => {
  let testList: Task[];
  beforeEach(() => {
    testList = structuredClone([todoTask, inProgressTask, doneTask]);
  });

  it('should update `status` to "in-progress"', () => {
    const actual = updateStatus(testList, todoTask.id, 'in-progress').find(
      ({ id }) => id === todoTask.id
    );
    assert.equal(actual?.status, 'in-progress');
  });

  it('should update updatedAt', () => {
    const actual = updateStatus(testList, todoTask.id, 'in-progress').find(
      ({ id }) => id === todoTask.id
    );
    assert.notEqual(actual?.updatedAt, undefined);
    assert.notEqual(actual?.updatedAt, todoTask.updatedAt);
  });

  it('should not update other tasks', () => {
    const updatedList = updateStatus(
      testList,
      inProgressTask.id,
      'in-progress'
    );
    const actualTodoTask = updatedList.find(({ id }) => id === todoTask.id);
    const actualDoneTask = updatedList.find(({ id }) => id === doneTask.id);
    assert.deepEqual(actualTodoTask, todoTask);
    assert.deepEqual(actualDoneTask, doneTask);
  });
});

describe('markInProgress() marks a task as in progress', () => {
  let testList: Task[];
  beforeEach(() => {
    testList = structuredClone([todoTask, inProgressTask, doneTask]);
  });

  it('should update `status` to "in-progress"', () => {
    const actual = markInProgress(testList, todoTask.id).find(
      ({ id }) => id === todoTask.id
    );
    assert.equal(actual?.status, 'in-progress');
  });
});

describe('markDone() marks a task as done', () => {
  let testList: Task[];
  beforeEach(() => {
    testList = structuredClone([todoTask, inProgressTask, doneTask]);
  });

  it('should update `status` to "done"', () => {
    const actual = markDone(testList, inProgressTask.id).find(
      ({ id }) => id === inProgressTask.id
    );
    assert.equal(actual?.status, 'done');
  });
});

describe('updateStatusArgsSchema parses an argument properly', () => {
  it('should parse [string]', () => {
    const id = 2;
    const idString = id.toString();
    const { success, data: actual } = updateStatusArgsSchema.safeParse([
      idString,
    ]);
    assert.ok(success);
    assert.deepEqual(actual, [id]);
  });

  it('should fails when parsing an empty args', () => {
    const { success } = updateStatusArgsSchema.safeParse([]);
    assert.ok(!success);
  });
});
