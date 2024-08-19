This is a CLI tool.

# Testability is high, importance is high

- [x] Accept subcommands as a second argument

  - [x] throws error if subcommand is not passed
  - [x] throws error if specified subcommand does not exist
    - [x] throws error if `none` is given as a subcommand
  - [x] runs a command if specified subcommand exists
    - [x] runs `dummy()` function, when `dummy` subcommand is passed

- [ ] The JSON file should be created if it does not exist.
- [ ] Reads and parse JSON data from the data file and pass it to the specified subcommand function
- [ ] `add()` adds a new task data
  - [ ] adds a new task to the given list, and returns the updated list
    - [ ] finds the maximum id from current list and makes an id that is one more than the maximum id
    - [ ] sets createdAt and updatedAt to the current time
    - [ ] appends data to the list and returns the new list
- [x] `delete()` deletes a task data
  - [x] removes a task from the given list and returns the updated list
    - [x] removes the task with the given id from the list
      - [x] returns [] if `list` is empty
      - [x] returns [] if `list` consisits of just one task with id 1, `id` is 1
    - [x] returns the same list if the task with the given id is not found
      - [x] returns the same list if `list` contains only one task with id 1, and `id` is 2
- [ ] `update()` updates a task data
  - [ ] updates a task from the given list
    - [ ] finds a task specified by the given id
    - [ ] updates `description` and `updatedAt` fields of a task
    - [ ] returns the updated list
- [ ] `mark-in-progress()` marks a task as in progress
- [ ] `mark-in-progress()` marks a task as done

- [ ] `list()` returns tasks

  - [ ] returns all tasks, when no option is provided
  - [ ] returns tasks filtered by status
    - [ ] `list done` returns tasks that are done
    - [ ] `list todo` returns tasks that are not done
    - [ ] `list in-progress` returns tasks that are in progress

- [ ] Store tasks in a JSON file in the currnet directory.
  - [ ] makes a data file if it does not exist when modify it
  - [ ] reads data from the file
  - [ ] writes data to the file
  - [ ] can parse JSON as lists
  - [ ] can convert lists to JSON

=================================================

# Testability is low, importance is low

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
