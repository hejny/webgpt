import { useEffect, useState } from 'react';

/**
 * @@@
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

/**
 * TODO: !!! DO not use this hook JUST provisonally
 */
