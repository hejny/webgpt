import { Workerify } from '../../../0-Workerify/Workerify';
import { MockedMultitaskWithImageGeneratorRequest, MockedMultitaskWithImageGeneratorResult } from '../mockedMultitaskWithImageGenerator';

/**
 * @private Use only withing the folder mockedMultitaskWithImageGenerator
 */

export const mockedMultitaskWithImageGeneratorWorkerify = new Workerify<MockedMultitaskWithImageGeneratorRequest, MockedMultitaskWithImageGeneratorResult>();

/**
 * TODO: [☄] This file should be auto-generated from mockedMultitaskWithImageGenerator.ts, there should be some tag @workerify to mark candidate for workerify
 */
