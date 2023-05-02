import { ReactNode } from 'react';
import styles from './HeaderWallpaper.module.css';

/**
 * @@
 */
export function HeaderWallpaper({ children }: { children: ReactNode }) {
    return <div className={styles.HeaderWallpaper}>{children}</div>;
}
