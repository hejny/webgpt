import { useEffect, useState } from 'react';
import { forAnimationFrame } from 'waitasecond';

/**
 * @@@
 *
 * @private
 * @singleton
 */
export let restNonce = 0;

/**
 * @@@
 */
export async function forARest(): Promise<void> {
    if (restNonce++ % 1000 === 0) {
        console.log('💤 Resting');
        await forAnimationFrame();
    }
}



/**
 * TODO: Detect time delta and use it for more precise waiting
 * TODO: [🧠] useRefresh / observeVariable
 */
