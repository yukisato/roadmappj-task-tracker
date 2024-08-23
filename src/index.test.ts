import assert from 'node:assert';
import { describe, it } from 'node:test';
import { missingCommandError, wrongCommandError } from './lib/error';

describe('index()', () => {
  it('should throw error if subcommand is not passed', async () => {
    await assert.rejects(
      async () => await import('./index'),
      missingCommandError
    );
  });
  it('should throw error if a wrong subcommand is passed', async () => {
    process.argv = ['', '', 'wrong-command'];
    await assert.rejects(
      async () => await import('./index'),
      wrongCommandError
    );
  });
});
