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
        <div className={styles.Menu} data-toggle-element="unit">
            <div
                className={styles.MenuBar}
                data-toggle-element="button"
                /*
                !!!! Remove
                onClick={() => {
                    // TODO: !!!! To export
                    document.getElementsByClassName(styles.Menu)[0].classList.toggle(styles.open);
                }}
                */
            >
                <div className={classNames(styles.bar, styles.bar1)}></div>
                <div className={classNames(styles.bar, styles.bar2)}></div>
                <div className={classNames(styles.bar, styles.bar3)}></div>
            </div>
            <nav
                className={styles.MenuContent}
                /*
                !!!! Remove
                onClick={() => {
                    document.getElementsByClassName(styles.Menu)[0].classList.remove(styles.open);

                    // !!!! Close on click outside + work with plain exported javascript
                }}
                */
            >
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

            <Script id="toggle-control">
                {
                    // Note: Using inline script to pass the menu control to the exported page
                    spaceTrim(`
                        
                        for (const unitElement of Array.from(window.document.querySelectorAll('[data-toggle-element="unit"]'))) {
                            if (unitElement.getAttribute('data-toggle-activated')) {
                                continue;
                            }
                            unitElement.setAttribute('data-toggle-activated', 'true');
                
                            const buttonElement = unitElement.querySelector('[data-toggle-element="button"]');
                
                            if (!buttonElement) {
                                throw new Error(
                                    'Toggle error: element[data-toggle-element="toggle"] must have child element[data-toggle-element="button"]',
                                );
                            }
                
                            buttonElement.addEventListener('click', () => {
                                let state = unitElement.getAttribute('data-toggle-state');
                                if (!state) {
                                    state = 'closed';
                                }
                
                                if (state === 'closed') {
                                    unitElement.setAttribute('data-toggle-state', 'open');
                                } else {
                                    unitElement.setAttribute('data-toggle-state', 'closed');
                                }
                            });
                
                            window.addEventListener('click', (event) => {
                                if (unitElement.contains(event.target)) {
                                    return;
                                }
                
                                unitElement.setAttribute('data-toggle-state', 'closed');
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
 * TODO: !!!! Menu in export should look like <script>:
 *
 *           - Comments
 *           - Inlined Script
 *           (Maybe unprefix)


        <!-------------[ Menu: ]--------------->

        <div class="Menu_Menu__HK_sB">
            <div class="Menu_MenuBar__BXd90">
                <div class="Menu_bar__kOpdk Menu_bar1__FFq3D"></div>
                <div class="Menu_bar__kOpdk Menu_bar2__dlqrb"></div>
                <div class="Menu_bar__kOpdk Menu_bar3__qDuvi"></div>
            </div>
            <nav class="Menu_MenuContent__ZcI37">
                <ul>
                    <li><a href="https://1-2i.com/">Home</a></li>
                    <li class="Menu_featured__6_rbw">
                        <a href="/caadd184-364b-4ec7-a0cc-436d0e3b5330?modal=export">Get the web</a>
                    </li>
                    <li><a href="/caadd184-364b-4ec7-a0cc-436d0e3b5330?modal=edit">Edit</a></li>
                    <li><a href="https://1-2i.com/pricing">Pricing</a></li>
                    <li><a href="/?home=/">Gallery</a></li>
                    <li><a href="https://1-2i.com/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
        <div class="Menu_MenuBgWrapper__yceuG"><div class="Menu_MenuBg__MZGx2"></div></div>
        <script>
            document.getElementsByClassName('Menu_MenuBar__BXd90')[0].addEventListener('click', function () {
                document.getElementsByClassName('Menu_MenuBar__BXd90')[0].classList.toggle('Menu_open__HErSU');
                document.getElementsByClassName('Menu_MenuContent__ZcI37')[0].classList.toggle('Menu_open__HErSU');
                document.getElementsByClassName('Menu_MenuBg__MZGx2')[0].classList.toggle('Menu_open__HErSU');
            });

            document.getElementsByClassName('Menu_MenuContent__ZcI37')[0].addEventListener('click', function () {
                document.getElementsByClassName('Menu_MenuBar__BXd90')[0].classList.remove('Menu_open__HErSU');
                document.getElementsByClassName('Menu_MenuContent__ZcI37')[0].classList.remove('Menu_open__HErSU');
                document.getElementsByClassName('Menu_MenuBg__MZGx2')[0].classList.remove('Menu_open__HErSU');
            });
        </script>
        <!-------------[ /Menu ]--------------->








 */
