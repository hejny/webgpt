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
    if (i++ % 100000) {
        console.log('forARest');
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
 * TODO: [🧠] useRefresh / observeVariable
 * TODO: !!!! Put in own component
 */
