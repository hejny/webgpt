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
                        {/* TODO: !!! Use <Link> from Next */}
                        {/* TODO: !!! Export all pages */}
                        <li>
                            <a href="https://ai.hejny.org/">Home</a>
                        </li>
                        <li>
                            <a href="https://ai.hejny.org/pricing">Pricing</a>
                        </li>
                        <li>
                            <Link href={`/?home=${encodeURIComponent(router.asPath)}/`}>Gallery</Link>
                        </li>
                        <li>
                            <a href="mailto:me@pavolhejny.com">Contact</a>
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
