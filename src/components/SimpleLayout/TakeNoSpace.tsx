import type { ReactNode } from 'react';
import styles from './TakeNoSpace.module.css';

interface TakeNoSpaceProps {
    /**
     * Content which will be centered
     */
    children?: ReactNode;
}

/**
 * TakeNoSpaces places the content in the top left corner of the parent element
 * and for other elements it takes no space
 */
export function TakeNoSpace(props: TakeNoSpaceProps) {
    const { children } = props;
    return (
        <div className={styles.outer}>
            <div className={styles.inner}>{children}</div>
        </div>
    );
}
