import { forImmediate } from 'waitasecond';

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
export async function forARest(): Promise<void> {
    /**
     * The current timestamp
     *
     * @type {number}
     */
    const now = performance.now();

    // !!! Fix
    restNonce++;

    if (now - lastRest > REST_AFTER_MS) {
        console.log('💤 Resting');
        lastRest = now;
        await forImmediate();
        // await forAnimationFrame();
    }
}

/**
 * TODO: Detect time delta and use it for more precise waiting
 * TODO: [🧠] useRefresh / observeVariable
 */
