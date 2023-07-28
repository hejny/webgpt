import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { activateMenuComponents } from '../ai-components/activateMenuComponents';
import { AiComponentsRoot } from '../AiComponentsRoot/AiComponentsRoot';
import { ExportCommentedBlock } from '../ExportComment/ExportCommentedBlock';
import styles from './Menu.module.css';

/**
 * @@
 */
export function Menu() {
    const router = useRouter();
    const [wallpaper] = useWallpaper();

    return (
        <ExportCommentedBlock name="Menu">
            <AiComponentsRoot usedComponents={[activateMenuComponents]} className={styles.MenuRoot}>
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
                            {/* TODO: !!!! All pages into export (also the hidden ones) */}
                            {/* TODO: !!!! Pages in export should be transformed from ?page=foo to just /foo */}
                            <li>
                                <Link
                                    href={{
                                        pathname: '/[wallpaper]',
                                        query: {
                                            wallpaper: router.query.wallpaper,
                                            mode: router.query.mode,
                                            page: undefined,
                                        },
                                    }}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className={styles.featured}>
                                <Link
                                    href={{
                                        pathname: '/[wallpaper]',
                                        query: {
                                            wallpaper: router.query.wallpaper,
                                            mode: router.query.mode,
                                            page: router.query.page,
                                            modal: 'export',
                                        },
                                    }}
                                    /* Note: Keeping prefetch because we want to be this as-fast-as-possible */
                                >
                                    Get the web
                                </Link>
                            </li>
                            {/* TODO: Maybe ?modal=explain link */}
                            <li>
                                <Link
                                    href={{
                                        pathname: '/[wallpaper]',
                                        query: {
                                            wallpaper: router.query.wallpaper,
                                            mode: router.query.mode,
                                            page: 'pricing',
                                        },
                                    }}
                                    prefetch={false /* <- Note: Because it is rare option */}
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={{
                                        pathname: '/[wallpaper]',
                                        query: {
                                            wallpaper: router.query.wallpaper,
                                            mode: router.query.mode,
                                            page: 'gallery',
                                        },
                                    }}
                                    prefetch={false /* <- Note: Because it is rare option */}
                                >
                                    Gallery
                                </Link>
                            </li>
                            {wallpaper.parent && (
                                <li>
                                    <Link
                                        href={`/${wallpaper.parent}`}
                                        prefetch={false /* <- Note: Because it is rare option */}
                                    >
                                        Unedited version
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link
                                    href={{
                                        pathname: '/[wallpaper]',
                                        query: {
                                            wallpaper: router.query.wallpaper,
                                            mode: router.query.mode,
                                            page: 'contact',
                                        },
                                    }}
                                >
                                    Contact
                                </Link>
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

/**
 * TODO: !!!! [🧠] Structure of page, menus,...
 */
