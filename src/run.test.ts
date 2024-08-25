import { afterEach, beforeEach, describe, it } from 'node:test';
import { run } from './run';
import assert from 'node:assert/strict';
import { emptyData, writeTasks } from './lib/dataModifier';
import { inProgressTask, todoTask } from './lib/testData';

describe('run() invokes specified subcommand', () => {
  beforeEach(async () => {
    await emptyData();
  });
  afterEach(async () => {
    await emptyData();
  });

  it("should run 'list' command", async (t) => {
    const consoleLog = t.mock.method(console, 'log');

    await writeTasks([todoTask, inProgressTask]);

    assert.equal(consoleLog.mock.callCount(), 0);
    await run('list', ['todo']);
    assert.equal(consoleLog.mock.callCount(), 1);
  });
});
