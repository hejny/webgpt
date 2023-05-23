import { useEffect, useState } from 'react';

/**
 * React hook that refreshes component every given time interval.
 *
 * @param miliSeconds
 */
export function useRefresh(miliSeconds: number) {
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefresh(!refresh);
        }, miliSeconds);
        return () => clearInterval(interval);
    }, [miliSeconds, refresh]);

    return refresh;
}

/**
 * TODO: !!! DO not use this hook JUST provisonally
 */
