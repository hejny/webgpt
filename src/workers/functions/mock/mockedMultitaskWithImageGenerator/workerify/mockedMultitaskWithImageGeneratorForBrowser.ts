import { mockedMultitaskWithImageGeneratorWorkerify } from './mockedMultitaskWithImageGeneratorWorkerify';

/**
 * Create a new wallpaper
 *
 * Note: This function is internally using webworker
 */
export const mockedMultitaskWithImageGeneratorForBrowser = mockedMultitaskWithImageGeneratorWorkerify.makeConnectorForBrowser(
    () => new Worker(new URL('./mockedMultitaskWithImageGenerator.worker.ts', import.meta.url)),
);

/**
 * TODO: [🧠] Maybe rename to mockedMultitaskWithImageGeneratorInBrowser
 * TODO: [☄] This file should be auto-generated from mockedMultitaskWithImageGenerator.ts, there should be some tag @workerify to mark candidate for workerify
 */
