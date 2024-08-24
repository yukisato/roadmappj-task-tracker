import { Task } from '@/types/task';
import { beforeEach, describe, it } from 'node:test';
import { update, updateArgsSchema } from './update';
import assert from 'node:assert/strict';
import { doneTask, inProgressTask, testData, todoTask } from '../lib/testData';

describe('update() updates a task with the given id in the list', () => {
  let initialList: Task[];
  beforeEach(() => {
    initialList = structuredClone(testData);
  });

  it('should update `description`', () => {
    const newDescription = todoTask.description + ' updated';
    const actualTodoTask = update(
      initialList,
      todoTask.id,
      newDescription
    ).find((task) => task.id === todoTask.id);
    assert.equal(actualTodoTask?.description, newDescription);
  });

  it('should update `updatedAt`', () => {
    const actualTodoTask = update(initialList, todoTask.id, 'updated').find(
      (task) => task.id === todoTask.id
    );
    assert.notEqual(actualTodoTask?.updatedAt, todoTask.updatedAt);
  });

  it('should not update other tasks', () => {
    const updatedList = update(initialList, todoTask.id, 'updated');
    const actualInProgressTask = updatedList.find(
      (task) => task.id === inProgressTask.id
    );
    const actualDoneTask = updatedList.find((task) => task.id === doneTask.id);
    assert.deepEqual(actualInProgressTask, inProgressTask);
    assert.deepEqual(actualDoneTask, doneTask);
  });
});

describe('updateArgsSchema parses an argument properly', () => {
  it('should parse ["1", "desc"] as [1, "desc"]', () => {
    assert.deepEqual(updateArgsSchema.safeParse(['1', 'desc']).data, [
      1,
      'desc',
    ]);
  });

  it('should fails when parsing an empty args', () => {
    assert.ok(!updateArgsSchema.safeParse([]).success);
  });
});
