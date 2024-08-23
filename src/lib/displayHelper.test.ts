import { describe, it } from 'node:test';
import { display, list } from './displayHelper';
import assert from 'node:assert/strict';
import { inProgressTask, todoTask } from './testData';

describe('display()', () => {
  it('should console.log a given task', (t) => {
    const consoleLog = t.mock.method(console, 'log');

    assert.equal(consoleLog.mock.callCount(), 0);
    display(todoTask);
    assert.equal(consoleLog.mock.callCount(), 1);
    assert.deepEqual(consoleLog.mock.calls[0].arguments, [
      todoTask.id,
      todoTask.description,
      todoTask.status,
      todoTask.createdAt,
      todoTask.updatedAt,
    ]);

    consoleLog.mock.restore();
  });
});

describe('list() filters tasks with the given status, then pass it to `display()`', () => {
  it('should call console.log 2 times with 2 length task list when status is not specified', (t) => {
    const consoleLog = t.mock.method(console, 'log');

    assert.equal(consoleLog.mock.callCount(), 0);
    list([todoTask, inProgressTask]);
    assert.equal(consoleLog.mock.callCount(), 2);

    consoleLog.mock.restore();
  });

  it('should call console.log 2 time with filtered tasks', (t) => {
    const consoleLog = t.mock.method(console, 'log');

    assert.equal(consoleLog.mock.callCount(), 0);
    list([todoTask, inProgressTask, inProgressTask], 'in-progress');
    assert.equal(consoleLog.mock.callCount(), 2);

    consoleLog.mock.restore();
  });
});
