import { MeshBuilder } from 'babylonjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { Center } from '../components/Center/Center';
import { GraphButton } from '../components/Graphs/GraphButton';
import styles from '../styles/static.module.css';

export default function HomePage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1>AI Web Maker</h1>I have…
                        <ul>
                            <Link href="/random">
                                <li>
                                    …<b>Nothing</b> and pick from gallery of pre-generated webs
                                </li>
                            </Link>

                            <Link href="/new/from-prompt">
                                <li>
                                    …<b>Idea</b> to describe and generate web
                                </li>
                            </Link>
                            <Link href="/new/from-image">
                                <li>
                                    …<b>Image</b> to upload and generate web
                                </li>
                            </Link>
                        </ul>
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
                                Need help
                            </GraphButton>
                        </Link>
                        <Link href="/new/from-prompt">
                            <GraphButton
                                createSceneMeshes={({ scene, camera, wireframeMaterial }) => {
                                    let ribbon = MeshBuilder.CreateTorus(
                                        'ribbon',
                                        {
                                            diameter: 1,
                                            thickness: 0.5,
                                            tessellation: 20,
                                        },
                                        scene,
                                    );
                                    ribbon.material = wireframeMaterial;
                                }}
                            >
                                Have idea
                            </GraphButton>
                        </Link>
                        <Link href="/new/from-image">
                            <GraphButton
                                createSceneMeshes={({ scene, camera, wireframeMaterial }) => {
                                    let ribbon = MeshBuilder.CreateTorus(
                                        'ribbon',
                                        {
                                            diameter: 1,
                                            thickness: 0.5,
                                            tessellation: 20,
                                        },
                                        scene,
                                    );
                                    ribbon.material = wireframeMaterial;
                                }}
                            >
                                Have custom image
                            </GraphButton>
                        </Link>
                    </Center>
                </main>
            </div>
        </>
    );
}

/**
 * TODO: !!! Different graohs
 * TODO: !!! Nicer fonts / handwritten
 * TODO: !!! DO not redirect to random wallpaper provide 3 scenarios:
 *       - 🙄 No idea
 *       - 💡 Idea
 *       - 🖼 Image
 * TODO: Go to last wallpaper
 * TODO: Make shuffle between wallpapers
 */
