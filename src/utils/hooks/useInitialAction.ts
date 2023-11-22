import { useEffect, useState } from 'react';

/**
 * This hook runs a callback exactly once when the component is mounted.
 */
export function useInitialAction(getIsReady: () => boolean, action: () => void): boolean {
    const [isPerformed, setPerformed] = useState(false);

    useEffect(() => {
        if (isPerformed) {
            return;
        }

        if (!getIsReady()) {
            return;
        }
        action();
        setPerformed(true);
    }, [getIsReady, action, isPerformed]);

    return isPerformed;
}
