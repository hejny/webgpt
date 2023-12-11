import { useEffect, useRef } from 'react';

/**
 * This hook runs a callback exactly once after some small delay after component is mounted.
 */
export function useInitialDelayedAction(action: () => void) {
    const isPerformed = useRef(false);

    useEffect(() => {
        if (isPerformed.current) {
            return;
        }

        const timeout = setTimeout(() => {
            isPerformed.current = true;
            action();
        }, 300);

        return () => clearTimeout(timeout);
    }, [isPerformed, action]);
}

/**
 * TODO: [🍭] Probbably useInitialDelayedAction should be default
 */
