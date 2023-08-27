import styles from './BackgroundPattern.module.css';

/**
 * Renders a pattern background with a layer of color on bottom
 */
export function BackgroundPattern() {
    return (
        <div className={styles.BackgroundPattern}>
            <div className={styles.layer}></div>
        </div>
    );
}
