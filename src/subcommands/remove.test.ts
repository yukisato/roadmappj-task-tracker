import { describe, it } from 'node:test';
import { remove, removeArgsSchema } from './remove';
import assert from 'node:assert/strict';
import { Task } from '@/types/task';
import { todoTask } from '../lib/testData';

describe('remove() deletes a task from a list', () => {
  it('should return [] if `list` is empty', () => {
    assert.deepEqual(remove([], 1), []);
  });

  it('should return [] if `list` consisits of just one task with id 1 and `id` is 1', () => {
    assert.deepEqual(remove([{ ...todoTask }], todoTask.id), []);
  });

  it('should return the same list if the specified task with the id is not found', () => {
    const original: Task[] = [{ ...todoTask }];
    assert.deepEqual(remove(original, todoTask.id + 1), original);
  });
});

describe('removeArgsSchema parses an argument properly', () => {
  it('should parse [string] as [number]', () => {
    assert.deepEqual(removeArgsSchema.safeParse(['2']).data, [2]);
  });

  it('should fail when parsing an empty args', () => {
    assert.ok(!removeArgsSchema.safeParse([]).success);
  });
});
