import { useContext } from 'react';
import { classNames } from '../../utils/classNames';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { useMode } from '../../utils/hooks/useMode';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { activateMenuComponent } from '../AiComponents/activateMenuComponent';
import { AiComponentsRoot } from '../AiComponents/AiComponentsRoot';
import { ExportCommentedBlock } from '../ExportComment/ExportCommentedBlock';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './Menu.module.css';

/**
 * @@
 */
export function Menu() {
    const [wallpaper] = useWallpaper();
    const { isPresenting } = useMode();
    const { isExported } = useContext(ExportContext);

    return (
        <ExportCommentedBlock name="Menu">
            <AiComponentsRoot usedComponents={{ menu: activateMenuComponent }} className={styles.MenuRoot}>
                <div className={styles.Menu} data-ai-component="menu">
                    <div className={styles.MenuBar} data-ai-element="bar">
                        {/* TODO: !!! This should be created and inserted here in activateMenuComponents
                                  OR figure out better identification then data-ai-component="menu"      */}
                        <div className={classNames(styles.bar, styles.bar1)}></div>
                        <div className={classNames(styles.bar, styles.bar2)}></div>
                        <div className={classNames(styles.bar, styles.bar3)}></div>
                    </div>
                    <nav className={styles.MenuContent}>
                        <ul>
                            <li>
                                <WallpaperLink page={'index'}>Home</WallpaperLink>
                            </li>
                            <li className={styles.featured}>
                                <WallpaperLink
                                    modal="export"
                                    mode="NORMAL"
                                    /* Note: Keeping prefetch because we want to be this as-fast-as-possible */
                                >
                                    Get the web
                                </WallpaperLink>
                            </li>

                            <li>
                                <WallpaperLink
                                    page="explanation"
                                    prefetch={false /* <- Note: Because it is rare option */}
                                >
                                    How it works?
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
                            {wallpaper.parent && (
                                <li>
                                    <WallpaperLink
                                        wallpaperId={wallpaper.parent}
                                        modal={null}
                                        page={'index'}
                                        // Note: Preserving mode
                                        prefetch={false /* <- Note: Because it is rare option */}
                                    >
                                        Unedited version
                                    </WallpaperLink>
                                </li>
                            )}
                            {!isExported && (
                                <li>
                                    {!isPresenting ? (
                                        <WallpaperLink mode="PRESENTATION">Present</WallpaperLink>
                                    ) : (
                                        <WallpaperLink mode="NORMAL">Show controls</WallpaperLink>
                                    )}
                                </li>
                            )}

                            <li>
                                <WallpaperLink page="contact">Contact</WallpaperLink>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.MenuBgWrapper}>
                        {/* <- Note: MenuBg is wrapped in MenuBgWrapper to hide its leak over the right fold of the page */}
                        <div className={styles.MenuBg}></div>
                    </div>
                </div>
            </AiComponentsRoot>
        </ExportCommentedBlock>
    );
}
