import { forAnimationFrame } from 'waitasecond';

/**
 * @@@
 *
 * @private
 * @singleton
 */
let i = 0;

/**
 * @@@
 */
export async function forARest(): Promise<void> {
    if (i++ % 1000) {
        await forAnimationFrame();
    }
}
