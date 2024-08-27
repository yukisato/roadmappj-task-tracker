import { commands } from '../types/command';

export class MissingCommandError extends Error {
  constructor() {
    super(`Subcommand is not passed. Use [${commands.join('|')}].`);
  }
}

export class WrongCommandError extends Error {
  constructor() {
    super(`Given subcommand is invalid. Use [${commands.join('|')}].`);
  }
}
