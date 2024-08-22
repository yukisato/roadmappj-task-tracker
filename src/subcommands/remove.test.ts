import { describe, it } from 'node:test';
import { remove } from './remove';
import assert from 'node:assert/strict';
import { Task } from '@/types/task';

describe('remove() deletes a task from a list', () => {
  it('returns [] if `list` is empty', () => {
    assert.deepEqual(remove([], 1), []);
  });
  it('returns [] if `list` consisits of just one task with id 1 and `id` is 1', () => {
    const actual = remove(
      [
        {
          id: 1,
          description: 'task 1',
          status: 'todo',
          createdAt: '2022-01-01T00:00:00.000Z',
          updatedAt: '2022-01-01T00:00:00.000Z',
        },
      ],
      1
    );
    assert.deepEqual(actual, []);
  });
  it('returns the same list if `list` contains only one task with id 1, and `id` is 2', () => {
    const list: Task[] = [
      {
        id: 1,
        description: 'task 1',
        status: 'todo',
        createdAt: '2022-01-01T00:00:00.000Z',
        updatedAt: '2022-01-01T00:00:00.000Z',
      },
    ];
    const actual = remove(list, 2);
    assert.deepEqual(actual, list);
  });
});
