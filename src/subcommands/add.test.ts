import { Task } from '@/types/task';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { add, addArgsSchema, getNextId } from './add';

describe('getNextId() returns an incremented next id', () => {
  it('should return 1 for an empty list', () => {
    assert.equal(getNextId([]), 1);
  });

  it('should return 2 if `list` has one task with id 1', () => {
    const list: Task[] = [
      {
        id: 1,
        description: 'task 1',
        status: 'todo',
        createdAt: '2022-01-01T00:00:00.000Z',
      },
    ];
    assert.equal(getNextId(list), 2);
  });
});

describe('addArgsSchema parses an argument properly', () => {
  it('should parse [string]', () => {
    const description = 'test description';
    const { success } = addArgsSchema.safeParse([description]);
    assert.ok(success);
  });

  it('should fails when parsing an empty args', () => {
    const { success } = addArgsSchema.safeParse([]);
    assert.ok(!success);
  });
});

describe('add() adds a new task to the list', () => {
  it('should create a task and add it to the list', () => {
    const initialList: Task[] = [];
    const description = 'task 1';
    const updatedList = add(initialList, description);
    assert.equal(updatedList.length, 1);

    const actualTask = updatedList[0];

    assert.equal(actualTask.id, 1);
    assert.equal(actualTask.description, description);
    assert.equal(actualTask.status, 'todo');
  });

  it('should be able to create tasks multiple times and increments the ids', () => {
    const initialList: Task[] = [];
    const description1 = 'task 1';
    const description2 = 'task 2';
    const updatedList = add(add(initialList, description1), description2);
    const actualTask1 = updatedList.find(
      ({ description }) => description === description1
    );
    const actualTask2 = updatedList.find(
      ({ description }) => description === description2
    );
    assert.equal(actualTask1?.id, 1);
    assert.equal(actualTask1?.description, description1);
    assert.equal(actualTask2?.id, 2);
    assert.equal(actualTask2?.description, description2);
  });
});
