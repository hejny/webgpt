import { useEffect, useState } from 'react';

/**
 * This hook runs a callback exactly once when the component is mounted.
 */
export function useInitial(callback: () => void): boolean {
    const [isInitial, setInitial] = useState(true);

    useEffect(() => {
        if (isInitial) {
            callback();
            setInitial(false);
        }
    }, [callback, isInitial]);

    return isInitial;
}
