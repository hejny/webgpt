import { useEffect, useState } from 'react';

/**
 * This hook runs a callback exactly once when the component is mounted.
 */
export function useInitialAction(getIsReady: () => boolean, action: () => void): boolean {
    const [isReady, setReady] = useState(false);

    // Note: This strange code is needed to prevent the action from being performed twice
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
 * TODO: [🍭] Split between useInitialAction vs useInitialActionWhenReady
 */
