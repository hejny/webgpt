import { useEffect, useState } from 'react';

/**
 * Detects whether the code is running on the server or not.
 *
 * @returns {boolean} - Whether the code is running on the server or not.
 */
export function useSsrDetection() {
    const [isRunningOnServer, setIsRunningOnServer] = useState<boolean>(true);
    useEffect(() => {
        setIsRunningOnServer(false);
    }, []);
    return isRunningOnServer;

    /**
     * Note: We can not use simple check like this:
     *
     * > return typeof window === 'undefined';
     *
     * Because it will cause an hydration mismatch error if we use it this hook
     * in the component that renders different content according to the result
     */
}
