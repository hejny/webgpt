import styles from './TiledBackground.module.css';

/**
 * Renders a tiled background with a layer of color on top
 */
export function TiledBackground() {
    return (
        <div className={styles.tiledBackground}>
            <div className={styles.layer}></div>
        </div>
    );
}

/**
 * TODO: !!! Is this used - if no - remove if yes - better annoration
 */
