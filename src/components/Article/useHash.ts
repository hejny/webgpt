import { useEffect, useState } from 'react';

/**
 * A React hook that observes changes to window.location.hash.
 * @returns The current hash value.
 * @generator https://sharegpt.com/c/Jwq09Pe
 * @deprecated This hook is deprecated. Use Next.js useRouter instead.
 */
export function useHash(): string {
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        /**
         * Updates the hash state with the current hash value.
         */
        const handleHashChange = () => {
            setHash(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return hash;
}
