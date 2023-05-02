import styles from './TiledBackground.module.css';

/**
 * A React component that renders a tiled background with a layer of color on top ⁘
 * 
 * @returns {JSX.Element} The tiled background element.
 */
export function TiledBackground() {
    return (
        <div className={styles.tiledBackground}>
            <div
                className={styles.layer}
                style={{
                    zIndex: 1000,
                    background: 'var(--main-background)',
                    opacity: 1,
                }}
            ></div>
        </div>
    );
}
