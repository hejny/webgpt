import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import styles from './Menu.module.css';

/**
 * @@
 */
export function Menu() {
    const router = useRouter();

    return (
        <>
            {/* [🍔] */}

            <div className={styles.Menu}>
                <div
                    className={styles.MenuBar}
                    onClick={() => {
                        // TODO: !!! To export

                        document.getElementsByClassName(styles.MenuBar)[0].classList.toggle(styles.open);
                        document.getElementsByClassName(styles.MenuContent)[0].classList.toggle(styles.open);
                        document.getElementsByClassName(styles.MenuBg)[0].classList.toggle(styles.open);
                    }}
                >
                    <div className={classNames(styles.bar, styles.bar1)}></div>
                    <div className={classNames(styles.bar, styles.bar2)}></div>
                    <div className={classNames(styles.bar, styles.bar3)}></div>
                </div>
                <nav className={styles.MenuContent}>
                    <ul>
                        {/* TODO: !!! Export all pages */}
                        <li>
                            <a href="https://ai.hejny.org/">Home</a>
                        </li>
                        <li className={styles.featured}>
                            <Link
                                href={{
                                    pathname: '/showcase/[wallpaper]',
                                    query: {
                                        wallpaper: router.query.wallpaper,
                                        modal: 'export',
                                    },
                                }}
                                prefetch={true /* <- Note: Because we want to be this as-fast-as-possible */}
                            >
                                Get the web!
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={{
                                    pathname: '/showcase/[wallpaper]',
                                    query: {
                                        wallpaper: router.query.wallpaper,
                                        modal: 'edit',
                                    },
                                }}
                                prefetch={false /* <- Note: Because it is rare option */}
                            >
                                Edit
                            </Link>
                        </li>
                        {/* TODO: Maybe ?modal=explain link */}
                        <li>
                            <a href="https://ai.hejny.org/pricing">Pricing</a>
                        </li>
                        <li>
                            <Link
                                href={`/?home=${encodeURIComponent(router.asPath)}/`}
                                prefetch={false /* <- Note: Because it is rare option */}
                            >
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <a href="https://ai.hejny.org/contact">Contact</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.MenuBgWrapper}>
                <div className={styles.MenuBg}></div>
            </div>
        </>
    );
}
