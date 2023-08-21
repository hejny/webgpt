import { useContext } from 'react';
import { WallpapersContext } from '../../utils/hooks/WallpapersContext';
import styles from './Debug.module.css';

/**
 * Function component for rendering the Debug component ⁘
 * 
 * 
 * @returns {ReactNode} The rendered Debug component.
 */
export function Debug() {
/**
 * The wallpapers context ⁘
 * 
 * 
 * @type {WallpapersContextType}
 */
    const wallpapers = useContext(WallpapersContext);

    return (
        <div className={styles.Debug}>
            WallpapersContext.Provider provides:
            <ul>
                {Object.keys(wallpapers).map((id) => (
                    <li key={id}>{id}</li>
                ))}
            </ul>
        </div>
    );
}
