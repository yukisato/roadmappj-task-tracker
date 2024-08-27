import { run } from './run';

(async () => {
  try {
    await run(process.argv);
  } catch (error) {
    console.error((error as Error).message);
  }
})();
