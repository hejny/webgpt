import { useEffect, useState } from 'react';
import { restNonce } from './forARest';
import styles from './WorkInProgress.module.css';

/**
 * A function component that renders an animated "loading indicator"
 */
export function WorkInProgress() {
    const [nonce, setNonce] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNonce((nonce) => nonce + 1);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [setNonce, nonce]);

    return <div className={styles.WorkInProgress}>{restNonce}</div>;
}
