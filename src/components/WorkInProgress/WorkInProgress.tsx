import { useEffect, useState } from 'react';
import { restNonce } from './forARest';
import styles from './WorkInProgress.module.css';

/**
 * Renders an animated "loading indicator" that is used to indicate that the app is working on something
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

/**
 * TODO: !!! Design
 */
