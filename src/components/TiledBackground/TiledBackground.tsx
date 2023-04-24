import styles from './TiledBackground.module.css';

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
