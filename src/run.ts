import { dummy } from './subcommands/dummy';

export const run = (command?: string) => {
  if (!command) throw new Error('subcommand is not passed');
  if (command === 'none') throw new Error('invalid subcommand');
  if (command === 'dummy') return dummy();
};
