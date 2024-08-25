import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { add, addArgsSchema, getNextId } from './add';
import { todoTask } from '../lib/testData';

describe('getNextId() returns an incremented next id', () => {
  it('should return 1 when the list is empty', () => {
    assert.equal(getNextId([]), 1);
  });

  it('should return 2 when the largest id in the list is 1', () => {
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
  it('should succeed in parsing ["desc"]', () => {
    assert.ok(addArgsSchema.safeParse(['desc']).success);
  });

  it('should fail when parsing an empty argument []', () => {
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
    const desc = 'task 2';
    const updated = add([{ ...todoTask, id: 1, description: 'task 1' }], desc);

    assert.equal(updated.length, 2);
    assert.equal(
      updated.find(({ description }) => description === desc)?.id,
      2
    );
  });
});
