import { forImmediate } from 'waitasecond';
import { isRunningInBrowser } from './isRunningInWhatever';

/**
 * The number of milliseconds to wait before resting again
 *
 * @type {number}
 */
const REST_AFTER_MS = 100; /* <- TODO: !! Tweak time */

/**
 * The timestamp of the last rest
 *
 * @type {number}
 */
let lastRest = 0;

/**
 * Function that performs a rest action
 *
 * @returns {Promise<void>}
 */
export async function forARest<TWorktype extends string>(worktype: TWorktype): Promise<void> {
    if (!isRunningInBrowser()) {
        // Note: Either in Node.js or in WebWorker - no need to rest
        return;
    }

    /**
     * The current timestamp
     *
     * @type {number}
     */
    const now = performance.now();

    if (now - lastRest > REST_AFTER_MS) {
        console.info(`💤 Resting on ${worktype}`);
        lastRest = now;
        await forImmediate();
        // await forAnimationFrame();
    }
}

/**
 * TODO: Detect time delta and use it for more precise waiting
 */
