import { MeshBuilder, Vector3 } from 'babylonjs';
import Link from 'next/link';
import { GraphButton } from '../Graphs/GraphButton';
import styles from './GraphsAsScenarios.module.css';

/**
 * Renders 3 scenarios to create a new wallpaper
 */
export function GraphsAsScenarios() {
    return (
        <ul className={styles.GraphsAsScenarios}>
            <li>
                <Link href="/random">
                    <GraphButton
                        createSceneMeshes={({ scene, camera, wireframeMaterial }) => {
                            let ribbon = MeshBuilder.CreateSphere(
                                'ribbon',
                                {
                                    diameter: 3,
                                    segments: 5,
                                },
                                scene,
                            );
                            ribbon.material = wireframeMaterial;
                        }}
                    >
                        {/* TODO: !! Use or remove <HandwrittenText color={Color.from('#fff')}>Nothing</HandwrittenText> */}
                        <h2>Nothing</h2> and I will pick from gallery
                    </GraphButton>
                </Link>
            </li>
            <li>
                <Link href="/new/from-prompt">
                    <GraphButton
                        createSceneMeshes={({ scene, camera, wireframeMaterial }) => {
                            let ribbon = MeshBuilder.CreateTorusKnot(
                                'ribbon',
                                {
                                    p: 2,
                                    q: 3,
                                    radius: 1,
                                    tube: 0.3,
                                    radialSegments: 20,
                                    tubularSegments: 5,
                                },
                                scene,
                            );
                            ribbon.rotation = new Vector3(Math.PI / -4, Math.PI / 2, 0);
                            ribbon.material = wireframeMaterial;
                        }}
                    >
                        <h2>Idea</h2> to describe and generate web
                    </GraphButton>
                </Link>
            </li>
            <li>
                <Link href="/new/from-image">
                    <GraphButton
                        createSceneMeshes={({ scene, camera, wireframeMaterial }) => {
                            let ribbon = MeshBuilder.CreateTorus(
                                'ribbon',
                                {
                                    diameter: 1,
                                    thickness: 0.5,
                                    tessellation: 10,
                                },
                                scene,
                            );
                            ribbon.scaling = Vector3.One().scale(2.2);
                            ribbon.rotation = new Vector3(Math.PI / 2, Math.PI / 2, Math.PI / 5);
                            ribbon.material = wireframeMaterial;
                        }}
                    >
                        <h2>Image</h2> to upload and generate web
                    </GraphButton>
                </Link>
            </li>
        </ul>
    );
}
