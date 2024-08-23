import { missingCommandError, wrongCommandError } from './lib/error';
import { isCommand, run } from './run';

const [, , subcommand, ...args] = process.argv;
if (!subcommand) throw missingCommandError;
if (!isCommand(subcommand)) throw wrongCommandError;

run(subcommand);
