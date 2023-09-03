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
                                    segments: 3,
                                },
                                scene,
                            );
                            ribbon.material = wireframeMaterial;
                        }}
                    >
                        {/* TODO: !!! Use or remove <HandwrittenText color={Color.from('#fff')}>sss</HandwrittenText> */}
                        {/* // TODO: !!! Design of text */}…<b>Nothing</b> and pick from gallery of pre-generated webs
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
                        …<b>Idea</b> to describe and generate web
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
                            ribbon.scaling = Vector3.One().scale(2.5);
                            ribbon.material = wireframeMaterial;
                        }}
                    >
                        …<b>Image</b> to upload and generate web
                    </GraphButton>
                </Link>
            </li>
        </ul>
    );
}
