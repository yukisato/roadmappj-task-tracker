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
  - [x] should update `updatedAt`
  - [x] should not update other tasks
- [x] `markInPprogress()` marks a task as in progress
  - [x] should update `status` to "in-progress"
  - [x] should update `updatedAt`
  - [x] should not update other tasks
- [x] `markDone()` marks a task as done

  - [x] should update `status` to "done"
  - [x] should update `updatedAt`
  - [x] should not update other tasks

- [ ] readTasks() reads the JSON data file
  - [ ] makes a data file if it does not exist when modify it
  - [ ] reads data from the file
  - [ ] writes data to the file
  - [ ] can parse JSON as lists
  - [ ] can convert lists to JSON
- [ ] writeTasks() writes a data to the JSON data file
  - [ ] should write a task list to the data file

## Testability is low, importance is low

- [ ] accept cli arguments and invoke relateed subcommand function
- [ ] `list()` filters tasks with the given status, then pass it to `display()`
- [ ] `display()` displays a given task

  - [ ] should console.log the task

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
