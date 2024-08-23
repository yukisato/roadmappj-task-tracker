import { missingCommandError, wrongCommandError } from './lib/error';
import { isCommand, run } from './run';

const [, , subcommand, ...args] = process.argv;
if (!subcommand) throw missingCommandError;
if (!isCommand(subcommand)) throw wrongCommandError;

(async () => {
  try {
    await run(subcommand, args);
  } catch (error) {
    console.error((error as Error).message);
  }
})();
