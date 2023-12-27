import Link from 'next/link';
import { CreateZone } from '../CreateZone/CreateZone';
import styles from './Scenarios.module.css';

/**
 * Renders scenarios to create a new wallpaper
 */
export function Scenarios() {
    return (
        <div className={styles.Scenarios}>
            <ul>
                <li>
                    <Link href="/random">
                        <CreateZone className={styles.scenario}>
                            <h2>Nothing</h2>
                            Pick web from gallery of pre-prepared designg
                        </CreateZone>
                    </Link>
                </li>
                <li>
                    {/* Note: [🔮] Using <a/> not <Link/> because we want to fully reload the page to allow propper working of preventing unsaved changes*/}
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/new/from-idea">
                        <CreateZone className={styles.scenario}>
                            <h2>Idea</h2>
                            To describe and generate your website
                        </CreateZone>
                    </a>
                </li>
                <li>
                    {/* Note: [🔮] Using <a/> not <Link/> because we want to fully reload the page to allow propper working of preventing unsaved changes*/}
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/new/from-image">
                        <CreateZone className={styles.scenario}>
                            <h2>Image</h2>
                            To upload and generate your website
                        </CreateZone>
                    </a>
                </li>
                <li>
                    {/* Note: [🔮] Using <a/> not <Link/> because we want to fully reload the page to allow propper working of preventing unsaved changes*/}
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/new/from-instagram">
                        <CreateZone className={styles.scenario}>
                            <h2>Instagram</h2>
                            to generate your website
                        </CreateZone>
                    </a>
                </li>
                <li className={styles.preparing}>
                    <CreateZone className={styles.scenario}>
                        <h2>Preparing</h2>
                        new options are coming soon
                    </CreateZone>
                </li>
            </ul>
        </div>
    );
}

/**
 * TODO: !! Hover effect on graphs
 */
