import { useContext } from 'react';
import { classNames } from '../../utils/classNames';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { useRole } from '../../utils/hooks/useRole';
import { activateMenuComponent } from '../AiComponents/activateMenuComponent';
import { AiComponentsRoot } from '../AiComponents/AiComponentsRoot';
import { ExportCommentedBlock } from '../ExportComment/ExportCommentedBlock';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './Menu.module.css';

/**
 * Renders the menu for navigating the wallpaper page
 */
export function Menu() {
    const [wallpaper] = useCurrentWallpaper();
    const role = useRole();
    const { isExported } = useContext(ExportContext);

    return (
        <ExportCommentedBlock name="Menu">
            <AiComponentsRoot usedComponents={{ menu: activateMenuComponent }} className={styles.MenuRoot}>
                <div className={styles.Menu} data-ai-component="menu">
                    <div className={styles.MenuHamburger} data-ai-element="bar">
                        {/* TODO: This should be created and inserted here in activateMenuComponents
                                  OR figure out better identification then data-ai-component="menu"
                        */}
                        <div className={classNames(styles.bar, styles.bar1)}></div>
                        <div className={classNames(styles.bar, styles.bar2)}></div>
                        <div className={classNames(styles.bar, styles.bar3)}></div>
                    </div>
                    <nav className={styles.MenuContent}>
                        <ul>
                            <li>
                                <WallpaperLink page={'index'}>Home</WallpaperLink>
                            </li>

                            <li>
                                <WallpaperLink
                                    page="explanation"
                                    prefetch={false /* <- Note: Because it is rare option */}
                                >
                                    FAQ?
                                </WallpaperLink>
                            </li>

                            <li>
                                <WallpaperLink page="pricing" prefetch={false /* <- Note: Because it is rare option */}>
                                    Pricing
                                </WallpaperLink>
                            </li>
                            <li>
                                <WallpaperLink page="gallery" prefetch={false /* <- Note: Because it is rare option */}>
                                    Gallery
                                </WallpaperLink>
                            </li>

                            <li>
                                <WallpaperLink page="contact">Contact</WallpaperLink>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.MenuBackgroundWrapper}>
                        {/* <- Note: MenuBackground is wrapped in MenuBackgroundWrapper to hide its leak over the right fold of the page */}
                        <div className={styles.MenuBackground} data-ai-element="background"></div>
                    </div>
                </div>
            </AiComponentsRoot>
        </ExportCommentedBlock>
    );
}
