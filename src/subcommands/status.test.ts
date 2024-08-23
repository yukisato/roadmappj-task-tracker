import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import { markDone, markInProgress, updateStatus } from './status';
import { Task } from '@/types/task';
import { doneTask, inProgressTask, testData, todoTask } from '../lib/testData';

describe('updateStatus() updates updates a status of a task', () => {
  let initialList: Task[];
  beforeEach(() => {
    // Copy the shallow data.
    initialList = testData.map((task) => ({ ...task }));
  });

  it('should update `status` to "in-progress"', () => {
    const actual = updateStatus(initialList, todoTask.id, 'in-progress').find(
      ({ id }) => id === todoTask.id
    );
    assert.equal(actual?.status, 'in-progress');
  });

  it('should update updatedAt', () => {
    const actual = updateStatus(initialList, todoTask.id, 'in-progress').find(
      ({ id }) => id === todoTask.id
    );
    assert.notEqual(actual?.updatedAt, undefined);
    assert.notEqual(actual?.updatedAt, todoTask.updatedAt);
  });

  it('should not update other tasks', () => {
    const updatedList = updateStatus(
      initialList,
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
  let initialList: Task[];
  beforeEach(() => {
    initialList = structuredClone(testData);
  });

  it('should update `task.status` to "in-progress"', () => {
    const actual = markInProgress(initialList, todoTask.id).find(
      ({ id }) => id === todoTask.id
    );
    assert.equal(actual?.status, 'in-progress');
  });

  it('should update updatedAt', () => {
    const actual = markInProgress(initialList, todoTask.id).find(
      ({ id }) => id === todoTask.id
    );
    assert.notEqual(actual?.updatedAt, undefined);
    assert.notEqual(actual?.updatedAt, todoTask.updatedAt);
  });

  it('should not update other tasks', () => {
    const updatedList = markInProgress(initialList, inProgressTask.id);
    const actualTodoTask = updatedList.find(({ id }) => id === todoTask.id);
    const actualDoneTask = updatedList.find(({ id }) => id === doneTask.id);
    assert.deepEqual(actualTodoTask, todoTask);
    assert.deepEqual(actualDoneTask, doneTask);
  });
});

describe('markDone() marks a task as done', () => {
  let initialList: Task[];
  beforeEach(() => {
    initialList = structuredClone(testData);
  });

  it('should update `task.status` to "done"', () => {
    const actual = markDone(initialList, inProgressTask.id).find(
      ({ id }) => id === inProgressTask.id
    );
    assert.equal(actual?.status, 'done');
  });

  it('should update updatedAt', () => {
    const actual = markDone(initialList, inProgressTask.id).find(
      ({ id }) => id === inProgressTask.id
    );
    assert.notEqual(actual?.updatedAt, undefined);
    assert.notEqual(actual?.updatedAt, inProgressTask.updatedAt);
  });

  it('should not update other tasks', () => {
    const updatedList = markDone(initialList, doneTask.id);
    const actualTodoTask = updatedList.find(({ id }) => id === todoTask.id);
    const actualInProgressTask = updatedList.find(
      ({ id }) => id === inProgressTask.id
    );
    assert.deepEqual(actualTodoTask, todoTask);
    assert.deepEqual(actualInProgressTask, inProgressTask);
  });
});
