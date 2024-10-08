import { Task } from '@/types/task';
import { beforeEach, describe, it, mock } from 'node:test';
import { update, updateArgsSchema } from './update';
import assert from 'node:assert/strict';
import { doneTask, inProgressTask, todoTask } from '../lib/testData';

describe('update() updates a task with the given id in the list', () => {
  let testList: Task[];
  beforeEach(() => {
    testList = structuredClone([todoTask, inProgressTask, doneTask]);
  });

  it('should update `description`', () => {
    const desc = todoTask.description + ' updated';
    const actual = update(testList, todoTask.id, desc).find(
      (task) => task.id === todoTask.id
    );
    assert.equal(actual?.description, desc);
  });

  it('should update `updatedAt`', () => {
    mock.timers.enable({ apis: ['Date'] });
    const list: Task[] = [
      {
        ...inProgressTask,
        updatedAt: new Date().toISOString(),
      },
    ];

    mock.timers.tick(1000);
    const expected = new Date().toISOString();

    assert.notEqual(list[0].updatedAt, expected);
    const updated = update(list, inProgressTask.id, 'updated');
    assert.equal(updated[0].updatedAt, expected);
  });

  it('should not update other tasks', () => {
    const updatedList = update(testList, todoTask.id, 'updated');
    const actualInProgressTask = updatedList.find(
      (task) => task.id === inProgressTask.id
    );
    const actualDoneTask = updatedList.find((task) => task.id === doneTask.id);
    assert.deepEqual(actualInProgressTask, inProgressTask);
    assert.deepEqual(actualDoneTask, doneTask);
  });
});

describe('updateArgsSchema parses an argument properly', () => {
  it('should succeed in parsing ["1", "desc"] as [1, "desc"]', () => {
    assert.deepEqual(updateArgsSchema.safeParse(['1', 'desc']).data, [
      1,
      'desc',
    ]);
  });

  it('should fail to parse an empty argument', () => {
    assert.ok(!updateArgsSchema.safeParse([]).success);
  });
});
