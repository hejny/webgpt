import Link from 'next/link';
import { CreateZone } from '../CreateZone/CreateZone';
import { UploadNewWallpaper } from '../UploadNewWallpaper/UploadNewWallpaper';
import styles from './GraphsAsScenarios.module.css';

/**
 * Renders 3 scenarios to create a new wallpaper
 */
export function GraphsAsScenarios() {
    return (
        <ul className={styles.GraphsAsScenarios}>
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
                <UploadNewWallpaper className={styles.scenario}>
                    <h2>Image</h2>
                    To upload and generate your website
                </UploadNewWallpaper>
            </li>
            <li>
                <Link href="/new/from-url">
                    <CreateZone className={styles.scenario}>
                        <h2>Website</h2>
                        To redesign your old site
                    </CreateZone>
                </Link>
            </li>
    );
}

/**
 * TODO: !! Hover effect on graphs
 */
