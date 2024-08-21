import { Task } from '@/types/task';
import { describe, it } from 'node:test';
import { update } from './update';
import assert from 'node:assert';

describe('update() updates a task with the given id in the list', () => {
  const initialList: Task[] = [
    {
      id: 1,
      description: 'current task 1',
      status: 'todo',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
    },
    {
      id: 2,
      description: 'current task 2',
      status: 'todo',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
    },
  ];
  const id = 1;
  const newDescription = 'updated task';
  const updatedList = update(initialList, id, newDescription);
  const updatedTask = updatedList.find((task) => task.id === id);

  it('should update `description`', () => {
    assert.equal(updatedTask?.description, newDescription);
  });

  it('should update `updatedAt`', () => {
    assert.notEqual(updatedTask?.updatedAt, initialList[0].updatedAt);
  });

  it('should not update other tasks', () => {
    assert.deepEqual(
      updatedList?.find(({ id }) => id === 2),
      initialList[1]
    );
  });
});
