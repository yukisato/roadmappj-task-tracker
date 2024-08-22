import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { dummy } from './dummy';

describe('dummy()', () => {
  it("returns 'ok'", () => {
    const result = dummy();
    assert.equal('ok', result);
  });
});
