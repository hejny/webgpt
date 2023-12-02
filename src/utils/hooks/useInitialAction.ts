import { useEffect, useState } from 'react';

/**
 * This hook runs a callback exactly once when the component is mounted.
 */
export function useInitialAction(getIsReady: () => boolean, action: () => void): boolean {
    console.info('!!! useInitialAction');

    const [isReady, setReady] = useState(false);
    const [isPerformed, setPerformed] = useState(false);
    console.info('!!! useState', { isReady, isPerformed });

    useEffect(() => {
        console.info('!!! useInitialAction useEffect', { isReady, isPerformed });

        if (!isReady) {
            setReady(true);
            return;
        }

        if (isPerformed) {
            return;
        }

        if (!getIsReady()) {
            return;
        }

        setPerformed(true);
        action();
    }, [getIsReady, action, isReady, isPerformed]);

    return isPerformed;
}

/**
 * TODO: !!! Are changes here wokring
 */
