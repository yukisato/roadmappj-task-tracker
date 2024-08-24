# Task Tracker CLI

## Overview

This project is an implementation of a learning project featured on [roadmap.sh](https://roadmap.sh/projects/task-tracker).

- ✅ Developed through TDD
- 📝 Tested with Node.js native test suite
- 🧑‍🎓 Good example for learners

## Installation

```bash
# Install dependencies
pnpm install

# Build
pnpm run build

# Run
cd ./bin
task-cli add "task 1"
task-cli list
```

## Command examples

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

## TODO (along with TDD)

### Testability is high, importance is high

- [x] `run()` accept subcommands as a second argument

  - [x] should throw error if subcommand is not passed
  - [x] should throw error if specified subcommand does not exist
  - [x] should run a command if specified subcommand exists

- [x] `getNextId()` returns an incremented next id
  - [x] should return 1 if `list` is empty
  - [x] should return 2 if `list` has one task with id 1
- [x] `add()` adds a new task to the list
  - [x] should create a task and add it to the list
  - [x] should increment the id to 2 for the secondaly added task
- [x] `remove()` removes a task with the given id from the list
  - [x] should return `[]` if `list` is empty
  - [x] should return `[]` if `list` contains just one task with id 1 and the given id is also 1
  - [x] should return the same list if the task with the given id is not found
  - [x] should return the same list if no task is found with the given id
- [x] `update()` updates a task with the given id in the list
  - [x] should update `description`
  - [x] should update `updatedAt` to the current time
  - [x] should not update other tasks
- [x] `updateStatus()` updates the status of a task
  - [x] refactor `markInPprogress()` and `markDone()` to use `updateStatus()`
  - [x] should update `status` to "in-progress"
  - [x] should update `updatedAt` to the current time
  - [x] should not update other tasks
- [x] `markInPprogress()` marks a task as in progress
  - [x] should update `status` to "in-progress"
- [x] `markDone()` marks a task as done

  - [x] should update `status` to "done"

- [x] define zod shemas for subcommand arguments

  - [x] zod schema for the arguments of `add()`
    - [x] should parse [string]
    - [x] should fails when parsing an empty args
  - [x] zod schema for the arguments of `remove()`
    - [x] should parse [string]
    - [x] should fails when parsing an empty args
  - [x] zod schema for the arguments of `update()`
    - [x] should parse [string, string]
    - [x] should fails when parsing an empty args
  - [x] zod schema for the arguments of `updateStatus()`
    - [x] should parse [string]
    - [x] should fails when parsing an empty args
  - [x] zod schema for the arguments of `list()`
    - [x] should parse []
    - [x] should parse [string]
    - [x] should fails when parsing a non-status [string]

- [x] `readTasks()` reads the JSON data file
  - [x] should write an empty data to the data file if the data file does not exist
  - [x] should read a task list from the data file
- [x] `writeTasks()` writes a data to the JSON data file
  - [x] should create a data file if the data file does not exist
  - [x] should write a task list to the data file
  - [x] should write an empty task list to the data file
- [x] `emptyData()` empties the data file
  - [x] should create the data file it if not exists
  - [x] should empty the data file
- [x] `run()` runs related subcommand function
  - [x] should run 'list' command
- [x] `index()` invokes `run()` with arguments
  - [x] should throw error if subcommand is not passed
  - [x] should throw error if a wrong subcommand is passed

## Testability is low, importance is low

- [x] create ./bin/task-cli to run the command
- [x] `list()` filters tasks with the given status, then pass it to `display()`
  - [x] should call console.log 2 times with 2 length task list when status is not specified
  - [x] should call console.log 1 time with filtered tasks
- [x] `display()` displays a given task
  - [x] should console.log a task
