import { commands } from '../run';

export const missingCommandError = new TypeError(
  `Subcommand is not passed. Use [${Object.keys(commands).join('|')}].`
);
export const wrongCommandError = new TypeError(
  `Given subcommand is invalid. Use [${Object.keys(commands).join('|')}].`
);
