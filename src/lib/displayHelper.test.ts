import { describe, it } from 'node:test';
import { list, listArgsSchema, WrongStatusError } from './displayHelper';
import assert from 'node:assert/strict';
import { inProgressTask, todoTask } from './testData';

describe('list() filters tasks with the given status, then pass it to `display()`', () => {
  it('should call console.log', (t) => {
    const consoleLog = t.mock.method(console, 'log');

    assert.equal(consoleLog.mock.callCount(), 0);
    list([todoTask, inProgressTask]);
    assert.equal(consoleLog.mock.callCount(), 1);
  });
});

describe('listArgsSchema correctly parses arguments', () => {
  it('should succeed in parsing an empty array []', () => {
    assert.ok(listArgsSchema.safeParse([]).success);
  });

  it('should succeed in parsing acorrect status ["todo"]', () => {
    assert.ok(listArgsSchema.safeParse(['todo']).success);
  });

  it('should fail to parse an incorrect status ["wrong status"]', () => {
    assert.throws(
      () => listArgsSchema.safeParse(['wrong status']),
      WrongStatusError
    );
  });
});
