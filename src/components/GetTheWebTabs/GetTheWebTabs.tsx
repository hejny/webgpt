import { classNames } from '../../utils/classNames';
import { useModal } from '../../utils/hooks/useModal';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './GetTheWebTabs.module.css';

/**
 * Renders the tabs to switch between publish and export
 */
export function GetTheWebTabs() {
    const modal = useModal();
    return (
        <ul className={styles.GetTheWebTabs}>
            <WallpaperLink modal={'publish'} className={classNames(modal === 'publish' && styles.active)}>
                <li>
                    <h3>Publish</h3>
                    <p>To have your web hosted by WebGPT</p>
                </li>
            </WallpaperLink>
            <WallpaperLink modal={'export'} className={classNames(modal === 'export' && styles.active)}>
                <li>
                    <h3>Export</h3>
                    <p>And host the web by your own</p>
                </li>
            </WallpaperLink>
        </ul>
    );
}

/**
 * TODO: Probbably make a component <ModalTabs/>
 */
