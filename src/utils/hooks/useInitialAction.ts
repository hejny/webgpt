import { useEffect, useState } from 'react';

/**
 * This hook runs a callback exactly once when the component is mounted.
 */
export function useInitialAction(getIsReady: () => boolean, action: () => void): boolean {
    const [isReady, setReady] = useState(false);

    // Note: !!!last
    const [isPerformed, setPerformed] = useState(false);

    useEffect(() => {
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
 * TODO: !!!last Are changes here wokring
 */
