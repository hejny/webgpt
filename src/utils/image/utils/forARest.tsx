import { useEffect, useState } from 'react';
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
    if (i++ % 1000 === 0) {
        console.log('💤 Resting');
        await forAnimationFrame();
    }
}

export function WorkInProgress() {
    const [nonce, setNonce] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNonce((nonce) => nonce + 1);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [setNonce, nonce]);

    return <div>{i}</div>;
}

/**
 * TODO: Detect time delta and use it for more precise waiting
 * TODO: [🧠] useRefresh / observeVariable
 * TODO: !!!! Put in own component
 */
