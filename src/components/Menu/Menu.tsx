import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import spaceTrim from 'spacetrim';
import { classNames } from '../../utils/classNames';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import styles from './Menu.module.css';

/**
 * @@
 */
export function Menu() {
    const router = useRouter();
    const [wallpaper] = useWallpaper();

    return (
        <div className={styles.Menu} data-toggle-element="menu">
            <div className={styles.MenuBar} data-toggle-element="bar">
                <div className={classNames(styles.bar, styles.bar1)}></div>
                <div className={classNames(styles.bar, styles.bar2)}></div>
                <div className={classNames(styles.bar, styles.bar3)}></div>
            </div>
            <nav className={styles.MenuContent}>
                <ul>
                    {/* TODO: !!! Export all pages */}
                    <li>
                        <a href="https://1-2i.com/">Home</a>
                    </li>
                    <li className={styles.featured}>
                        <Link
                            href={{
                                pathname: '/[wallpaper]',
                                query: {
                                    wallpaper: router.query.wallpaper,
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
                        <a href="https://1-2i.com/pricing">Pricing</a>
                    </li>
                    <li>
                        <Link
                            href={`/?home=${encodeURIComponent(router.asPath)}/`}
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
                                Model page
                            </Link>
                        </li>
                    )}
                    <li>
                        <a href="https://1-2i.com/contact">Contact</a>
                    </li>
                </ul>
            </nav>
            <div className={styles.MenuBgWrapper}>
                {/* <- Note: MenuBg is wrapped in MenuBgWrapper to hide its leak over the right fold of the page */}
                <div className={styles.MenuBg}></div>
            </div>

            <div style={{ display: 'none' }}>TODO: !!!! After this must be inlined script in the export </div>
            <Script id="toggle-control">
                {
                    // Note: Using inline script to pass the menu control to the exported page
                    spaceTrim(`
                        
                        for (const menuElement of Array.from(window.document.querySelectorAll('[data-toggle-element="menu"]'))) {
                            if (menuElement.getAttribute('data-toggle-activated')) {
                                continue;
                            }
                            menuElement.setAttribute('data-toggle-activated', 'true');
                
                            const barElement = menuElement.querySelector('[data-toggle-element="bar"]');
                
                            if (!barElement) {
                                throw new Error(
                                    'Toggle error: element[data-toggle-element="toggle"] must have child element[data-toggle-element="bar"]',
                                );
                            }
                
                            barElement.addEventListener('click', () => {
                                let state = menuElement.getAttribute('data-toggle-state');
                                if (!state) {
                                    state = 'closed';
                                }
                
                                if (state === 'closed') {
                                    menuElement.setAttribute('data-toggle-state', 'open');
                                } else {
                                    menuElement.setAttribute('data-toggle-state', 'closed');
                                }
                            });
                
                            window.addEventListener('click', (event) => {
                                if (menuElement.contains(event.target)) {
                                    return;
                                }
                
                                menuElement.setAttribute('data-toggle-state', 'closed');
                            });
                        }

                    `)
                }
            </Script>
        </div>
    );
}

/**
 * TODO: !!!! [🧠] Structure of page, menus,...
 */
