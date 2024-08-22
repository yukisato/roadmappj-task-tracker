import { describe, it } from 'node:test';
import { Task } from '@/types/task';
import { display } from './displayHelper';
import assert from 'node:assert/strict';

describe('display()', () => {
  it('should console.log a given task', (t) => {
    const consoleLog = t.mock.method(console, 'log');

    const id = 1;
    const description = 'task 1';
    const status = 'todo';
    const createdAt = '2022-01-01T00:00:00.000Z';
    const updatedAt = '2022-01-01T00:00:01.000Z';
    const task: Task = {
      id,
      description,
      status,
      createdAt,
      updatedAt,
    };

    assert.strictEqual(consoleLog.mock.callCount(), 0);
    display(task);
    assert.strictEqual(consoleLog.mock.callCount(), 1);
    assert.deepStrictEqual(consoleLog.mock.calls[0].arguments, [
      id,
      description,
      status,
      createdAt,
      updatedAt,
    ]);

    consoleLog.mock.restore();
  });
});
