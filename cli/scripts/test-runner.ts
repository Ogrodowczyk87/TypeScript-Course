import { startVitest } from 'vitest/node';
import { promises as fs } from 'fs';
import path from 'path';

interface TestOptions {
  watch: boolean;
}

function getTaskName(pathToTask: string) {
  return pathToTask.split('/').pop();
}

function getModuleAndTaskInfo(pathToTask: string) {
  const isReactTask = pathToTask.includes('react');
  const moduleName = isReactTask ? 'react' : 'core';

  // Get the folder name first
  const taskFolder = pathToTask.split('/').pop() || '';

  // Special mappings for cases where folder name doesn't match test file name
  const specialMappings: Record<string, string> = {
    '531-star-wars': 'starwars',
    // Add more mappings here if needed
  };

  let cleanTaskName = '';

  if (specialMappings[taskFolder]) {
    cleanTaskName = specialMappings[taskFolder];
  } else {
    // Default behavior - remove numbers from folder name
    cleanTaskName = taskFolder.replace(/^\d+-/, '');
  }

  return {
    moduleName,
    taskName: cleanTaskName,
    isReactTask
  };
}

async function updateVerifyTracker(moduleName: string, taskName: string, passed: boolean) {
  const trackerPath = path.join(process.cwd(), 'utils/progress/data/verify-tracker.json');

  try {
    let tracker;
    try {
      const trackerContent = await fs.readFile(trackerPath, 'utf8');
      tracker = JSON.parse(trackerContent);
    } catch (error) {
      // If file doesn't exist or is invalid, create default structure
      tracker = { core: {}, react: {} };
    }

    // Ensure module exists
    if (!tracker[moduleName]) {
      tracker[moduleName] = {};
    }

    // Update tracker only if test passed
    if (passed) {
      tracker[moduleName][taskName] = true;
    }

    // Write back to file
    await fs.writeFile(trackerPath, JSON.stringify(tracker, null, 2));
  } catch (error) {
    console.warn(`⚠️  Nie udało się zaktualizować trackera: ${error}`);
  }
}

async function runVitest(pathToTask: string, options: TestOptions) {
  const { isReactTask } = getModuleAndTaskInfo(pathToTask);
  const vitest = await startVitest('test', [pathToTask], {
    run: !options.watch,
    watch: options.watch,
    config: isReactTask ? 'vitest.config.react.ts' : 'vitest.config.node.ts',
  });

  if (!vitest) {
    throw new Error(`❌ Nie udało się uruchomić testów - poinformuj nas o tym."`);
  }

  const [fileTask] = vitest.state.getFiles() || [];
  const testFile = vitest.state.getReportedEntity(fileTask);
  const testResults = testFile?.task.result?.state;
  return testResults === 'pass';
}

export async function startTest(pathToTask: string, options: TestOptions = { watch: false }) {
  try {
    console.log(`\n👉 Sprawdzam zadanie "${pathToTask}"...`);

    const { moduleName, taskName } = getModuleAndTaskInfo(pathToTask);
    const isTestPassed = await runVitest(pathToTask, options);

    if (isTestPassed) {
      console.log(`\n✅ Gratulacje! Zadanie "${getTaskName(pathToTask)}" zaliczone!`);

      // Update tracker only if not in watch mode (to avoid multiple writes)
      if (!options.watch) {
        await updateVerifyTracker(moduleName, taskName, true);
        console.log(`📊 Status zadania zaktualizowany w systemie śledzenia postępów`);
      }
    } else {
      console.error(`\n❌ Zadanie nie zostało zaliczone :(`);
    }
  } catch (error) {
    console.error(`\n❌ Coś poszło nie tak :( \n\n`);
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
