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
                    <GraphButton
                        createSceneMeshes={({ scene, camera, wireframeMaterial }) => {
                            // TODO: !!! Better scenario buttons
                            let ribbon = MeshBuilder.CreateTorusKnot(
                                'ribbon',
                                {
                                    p: 3,
                                    q: 2,
                                    radius: 1,
                                    tube: 0.3,
                                    radialSegments: 20,
                                    tubularSegments: 5,
                                },
                                scene,
                            );
                            ribbon.scaling = Vector3.One().scale(2.2);
                            ribbon.rotation = new Vector3(Math.PI / 2, Math.PI / 2, Math.PI / 5);
                            ribbon.material = wireframeMaterial;
                        }}
                    >
                        <h2>Website</h2> your old web to update
                    </GraphButton>
                </Link>
            </li>
        </ul>
    );
}

/**
 * TODO: !! Hover effect on graphs
 */
