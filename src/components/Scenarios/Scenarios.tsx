import Link from 'next/link';
import { CreateZone } from '../CreateZone/CreateZone';
import styles from './Scenarios.module.css';

/**
 * Renders scenarios to create a new wallpaper
 */
export function Scenarios() {
    return (
        <div className={styles.Scenarios}>
            Pick a scenario to <b>create a your website</b>:
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
                    <Link href="/new/from-prompt">
                        <CreateZone className={styles.scenario}>
                            <h2>Idea</h2>
                            To describe and generate your website
                        </CreateZone>
                    </Link>
                </li>
                <li>
                    <Link href="/new/from-image">
                        <CreateZone className={styles.scenario}>
                            <h2>Image</h2>
                            To upload and generate your website
                        </CreateZone>
                    </Link>
                </li>
                <li>
                    <Link href="/new/from-instagram">
                        <CreateZone className={styles.scenario}>
                            <h2>Instagram</h2>
                            to generate your website
                        </CreateZone>
                    </Link>
                </li>
            </ul>grid-template
            
        </div>
    );
}

/**
 * TODO: !! Hover effect on graphs
 */
