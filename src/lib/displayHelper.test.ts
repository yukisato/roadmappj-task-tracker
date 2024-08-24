import { describe, it } from 'node:test';
import { list, listArgsSchema, wrongStatusError } from './displayHelper';
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

describe('listArgsSchema parses arguments properly', () => {
  it('should parse []', () => {
    assert.ok(listArgsSchema.safeParse([]).success);
  });

  it('should parse [string] as a proper status', () => {
    assert.ok(listArgsSchema.safeParse(['todo']).success);
  });

  it('should fails when parsing a non-status [string]', () => {
    assert.throws(
      () => listArgsSchema.safeParse(['wrong status']),
      wrongStatusError
    );
  });
});
