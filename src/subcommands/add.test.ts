import { Task } from '@/types/task';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { add, addArgsSchema, getNextId } from './add';
import { todoTask } from '../lib/testData';

describe('getNextId() returns an incremented next id', () => {
  it('should return 1 for an empty list', () => {
    assert.equal(getNextId([]), 1);
  });

  it('should return 2 if `list` has one task with id 1', () => {
    const actual = getNextId([
      {
        id: 1,
        description: 'task 1',
        status: 'todo',
        createdAt: '2022-01-01T00:00:00.000Z',
      },
    ]);
    assert.equal(actual, 2);
  });
});

describe('addArgsSchema parses an argument properly', () => {
  it('should parse [string]', () => {
    assert.ok(addArgsSchema.safeParse(['test description']).success);
  });

  it('should fails when parsing an empty args', () => {
    assert.ok(!addArgsSchema.safeParse([]).success);
  });
});

describe('add() adds a new task to the list', () => {
  it('should create a task and add it to the list', () => {
    const createdAt = new Date().toISOString();
    const expected = { ...todoTask, id: 1, createdAt };
    const updated = add([], expected.description);

    assert.equal(updated.length, 1);
    assert.deepEqual({ ...updated[0], createdAt }, expected);
  });

  it('should increment the id to 2 for the secondaly added task', () => {
    const desc1 = 'task 1';
    const desc2 = 'task 2';
    const updatedList = add(add([], desc1), desc2);
    const actualTask1 = updatedList.find(
      ({ description }) => description === desc1
    );
    const actualTask2 = updatedList.find(
      ({ description }) => description === desc2
    );
    assert.equal(actualTask1?.id, 1);
    assert.equal(actualTask2?.id, 2);
  });
});
