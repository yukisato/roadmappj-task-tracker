import { describe, it } from 'node:test';
import { remove, removeArgsSchema } from './remove';
import assert from 'node:assert/strict';
import { Task } from '@/types/task';
import { todoTask } from '../lib/testData';

describe('remove() deletes a task from a list', () => {
  it('returns [] if `list` is empty', () => {
    assert.deepEqual(remove([], 1), []);
  });

  it('returns [] if `list` consisits of just one task with id 1 and `id` is 1', () => {
    const actual = remove([{ ...todoTask }], todoTask.id);
    assert.deepEqual(actual, []);
  });

  it('returns the same list if the specified task with the id is not found', () => {
    const original: Task[] = [{ ...todoTask }];
    const actual = remove(original, todoTask.id + 1);
    assert.deepEqual(actual, original);
  });
});

describe('removeArgsSchema parses an argument properly', () => {
  it('should parse [string] as [number]', () => {
    const targetId = 2;
    const targetIdString = targetId.toString();
    const { success, data: actual } = removeArgsSchema.safeParse([
      targetIdString,
    ]);
    assert.ok(success);
    assert.deepEqual(actual, [targetId]);
  });

  it('should fails when parsing an empty args', () => {
    const { success } = removeArgsSchema.safeParse([]);
    assert.ok(!success);
  });
});
