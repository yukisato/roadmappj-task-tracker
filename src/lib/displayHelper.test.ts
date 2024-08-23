import { describe, it } from 'node:test';
import { display } from './displayHelper';
import assert from 'node:assert/strict';
import { todoTask } from './testData';

describe('display()', () => {
  it('should console.log a given task', (t) => {
    const consoleLog = t.mock.method(console, 'log');

    assert.strictEqual(consoleLog.mock.callCount(), 0);
    display(todoTask);
    assert.strictEqual(consoleLog.mock.callCount(), 1);
    assert.deepStrictEqual(consoleLog.mock.calls[0].arguments, [
      todoTask.id,
      todoTask.description,
      todoTask.status,
      todoTask.createdAt,
      todoTask.updatedAt,
    ]);

    consoleLog.mock.restore();
  });
});
