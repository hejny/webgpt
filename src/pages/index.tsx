import Link from 'next/link';
import { useRouter } from 'next/router';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { GraphButton } from '../components/Graphs/GraphButton';
import styles from '../styles/static.module.css';

export default function HomePage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <h1
                        style={{
                            display:
                                'none' /* <- TODO: For SEO/Social is it better to have invisible <h1> or just <title> + meta tags */,
                        }}
                    >
                        1-2i
                    </h1>
                    <Link href="/random">
                        <GraphButton>Need help</GraphButton>
                    </Link>
                    <Link href="/new/from-prompt">
                        <GraphButton>Have idea</GraphButton>
                    </Link>
                    <Link href="/new/from-image">
                        <GraphButton>Have custom image</GraphButton>
                    </Link>
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
