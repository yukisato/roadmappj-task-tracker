import { run } from './run';

const [, , subcommand, ...args] = process.argv;
if (!subcommand) throw Error('subcommand is not passed');

run(subcommand, args);
