This is a CLI tool.

## Testability is high, importance is high

- [x] Accept subcommands as a second argument

  - [x] throws error if subcommand is not passed
  - [x] throws error if specified subcommand does not exist
    - [x] throws error if `none` is given as a subcommand
  - [x] runs a command if specified subcommand exists
    - [x] runs `dummy()` function, when `dummy` subcommand is passed

- [x] `getNextId()` returns an incremented next id
  - [x] should return 1 if `list` is empty
  - [x] should return 2 if `list` has one task with id 1
- [x] `add()` adds a new task to the list
  - [x] add "task 1" to the empty list and got the new list
    - [x] it should have a length of 1
    - [x] it should have a task with id 1
    - [x] it should have a task with description of "task 1"
    - [x] it should have a task with status of "todo"
    - [x] it should have a `createdAt` as the current time
  - [x] add "task 2" to the empty list and got the new list
    - [x] it should have a length of 2
    - [x] it should have a task with id 2
    - [x] it should have a task with description of "task 2"
    - [x] it should have a task with status of "todo"
- [x] `remove()` removes a task with the given id from the list
  - [x] should return `[]` if `list` is empty
  - [x] should return `[]` if `list` contains just one task with id 1 and the given id is also 1
  - [x] should return the same list if the task with the given id is not found
  - [x] should return the same list if no task is found with the given id
- [x] `update()` updates a task with the given id in the list
  - [x] should update `description`
  - [ ] should update `updatedAt` to the current time
  - [x] should not update other tasks
- [ ] `updateStatus()` updates the status of a task
  - [x] refactor markInPprogress() and markDone() to use `updateStatus()`
  - [x] should update `status` to "in-progress"
  - [ ] should update `updatedAt` to the current time
  - [x] should not update other tasks
- [x] `markInPprogress()` marks a task as in progress
  - [x] should update `status` to "in-progress"
- [x] `markDone()` marks a task as done

  - [x] should update `status` to "done"

- [ ] define zod shemas for subcommand arguments

  - [x] zod schema for the arguments of `add()`
    - [x] should parse [string]
    - [x] should fails when parsing an empty args
  - [ ] zod schema for the arguments of `remove()`
    - [ ] should parse [string]
    - [ ] should fails when parsing an empty args
  - [ ] zod schema for the arguments of `update()`
    - [ ] should parse [string, string]
    - [ ] should fails when parsing an empty args
  - [ ] zod schema for the arguments of `markInProgress()`
    - [ ] should parse [string]
    - [ ] should fails when parsing an empty args
  - [ ] zod schema for the arguments of `markDone()`
    - [ ] should parse [string]
    - [ ] should fails when parsing an empty args
  - [ ] zod schema for the arguments of `list()`
    - [ ] should parse [string]
    - [ ] should fails when parsing an empty args

- [x] readTasks() reads the JSON data file
  - [x] should write an empty data to the data file if the data file does not exist
  - [x] should read a task list from the data file
- [x] writeTasks() writes a data to the JSON data file
  - [x] should create a data file if the data file does not exist
  - [x] should write a task list to the data file
  - [x] should write an empty task list to the data file
- [x] emptyData() empties the data file
  - [x] should create the data file it if not exists
  - [x] should empty the data file
- [ ] `run()` runs related subcommand function
- [x] `index()` invokes `run()` with arguments
  - [x] should throw error if subcommand is not passed
  - [x] should throw error if a wrong subcommand is passed

## Testability is low, importance is low

- [x] create ./bin/task-cli to run the command
- [ ] accept cli arguments and invoke relateed subcommand function
- [x] `list()` filters tasks with the given status, then pass it to `display()`
  - [x] should call console.log 2 times with 2 length task list when status is not specified
  - [x] should call console.log 1 time with filtered tasks
- [x] `display()` displays a given task

  - [x] should console.log a task

- [ ] createdAt is set properly
- [ ] updatedAt is set properly

Data type

```
id
description
status
createdAt
updatedAt
```

Command examples:

```bash
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```
