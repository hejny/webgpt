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
                            <GraphButton>Need help</GraphButton>
                        </Link>
                        <Link href="/new/from-prompt">
                            <GraphButton>Have idea</GraphButton>
                        </Link>
                        <Link href="/new/from-image">
                            <GraphButton>Have custom image</GraphButton>
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
