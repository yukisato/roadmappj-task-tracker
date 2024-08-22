import { Task } from '@/types/task';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { add, getNextId } from './add';

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

describe('add() adds a new task to the list', () => {
  it('should create and append the data to the list', () => {
    const initialList: Task[] = [];
    const description1 = 'task 1';
    const newList1 = add(initialList, description1);
    assert.equal(newList1.length, 1);
    const newTask1 = newList1.find((task) => task.id === 1);
    assert.notEqual(newTask1, undefined);
    assert.equal(newTask1?.id, 1);
    assert.equal(newTask1?.description, description1);
    assert.equal(newTask1?.status, 'todo');

    const description2 = 'task 2';
    const newList2 = add(newList1, description2);
    assert.equal(newList2.length, 2);
    const newTask2 = newList2.find((task) => task.id === 2);
    assert.notEqual(newTask2, undefined);
    assert.equal(newTask2?.description, description2);
    assert.equal(newTask2?.status, 'todo');
  });
});
