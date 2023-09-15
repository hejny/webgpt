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
                        <h2>Nothing</h2> and I will pick from gallery
                    </CreateZone>
                </Link>
            </li>
            <li>
                <Link href="/new/from-prompt">
                    <CreateZone className={styles.scenario}>
                        <h2>Idea</h2> to describe and generate web
                    </CreateZone>
                </Link>
            </li>
            <li>
                <UploadNewWallpaper className={styles.scenario}>
                    <h2>Image</h2> to upload and generate web
                </UploadNewWallpaper>
            </li>
        </ul>
    );
}

/**
 * TODO: !! Hover effect on graphs
 */
