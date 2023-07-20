import { forAnimationFrame } from 'waitasecond';

const REST_AFTER_MS = 10; /* <- TODO: !!! Tweak time */

/**
 * @@@
 *
 * @private
 * @singleton
 */
export let restNonce = 0;

/*
 * @@@
 *
 * @private
 * @singleton
 */
let lastRest = 0;

/**
 * @@@
 */
export async function forARest(): Promise<void> {
    const now = performance.now();

    restNonce++;

    if (now - lastRest > REST_AFTER_MS) {
        console.log('💤 Resting');
        lastRest = now;
        await forAnimationFrame();
    }
}

/**
 * TODO: Detect time delta and use it for more precise waiting
 * TODO: [🧠] useRefresh / observeVariable
 */
