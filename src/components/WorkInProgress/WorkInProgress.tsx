import { useEffect, useState } from 'react';
import { restNonce } from './forARest';
import styles from './WorkInProgress.module.css';

interface WorkInProgressProps {}

/**
 * @@
 */
export function WorkInProgress(props: WorkInProgressProps) {
    const {} = props;

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
