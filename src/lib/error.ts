import { commands } from '../types/command';

export const missingCommandError = new TypeError(
  `Subcommand is not passed. Use [${Object.keys(commands).join('|')}].`
);
export const wrongCommandError = new TypeError(
  `Given subcommand is invalid. Use [${Object.keys(commands).join('|')}].`
);
