import styles from './GetWebButton.module.css';

/**
 * @@
 */
export function GetWebButton() {
    return (
        <div className={styles.GetWebButton}>
            <button className="button">I want this web</button>
            <button className="button">Gallery</button>
            <button className="button">Random</button>
        </div>
    );
}

/**
 * TODO: !! Use translate
 */
