import { useEffect, useLayoutEffect, useState } from 'react';

/**
 * This hook runs a callback exactly once when the component is mounted.
 */
export function useInitialAction(getIsReady: () => boolean, action: () => void): boolean {
    console.info('!!! useInitialAction');

    const [isPerformed, setPerformed] = useState(false);

    useEffect(
        () => {
            console.info('!!! useInitialAction useEffect', { isPerformed });

            if (isPerformed) {
                return;
            }

            if (!getIsReady()) {
                return;
            }

            setPerformed(true);
            action();
        },
        // Note: !!!
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isPerformed],
    );

    return isPerformed;
}

/**
 * TODO: !!! Are changes here wokring
 */
