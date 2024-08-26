import { describe, it } from 'node:test';
import { remove, removeArgsSchema } from './remove';
import assert from 'node:assert/strict';
import { Task } from '@/types/task';
import { todoTask } from '../lib/testData';

describe('remove() deletes a task from a list', () => {
  it('should return an empty list when the data file is already empty', () => {
    assert.deepEqual(remove([], 1), []);
  });

  it('should return an empty list when the data file contains just one task with id 1 and the id is specified', () => {
    assert.deepEqual(remove([{ ...todoTask }], todoTask.id), []);
  });

  it('should return the same list as the one in the data file when the specified id is not in the list', () => {
    const original: Task[] = [{ ...todoTask }];
    assert.deepEqual(remove(original, todoTask.id + 1), original);
  });
});

describe('removeArgsSchema parses an argument properly', () => {
  it('should succeed in parsing ["2"] as [1]', () => {
    assert.deepEqual(removeArgsSchema.safeParse(['2']).data, [2]);
  });

  it('should fail to parse when the passed argument is empty', () => {
    assert.ok(!removeArgsSchema.safeParse([]).success);
  });
});
