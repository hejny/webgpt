import { useRouter } from 'next/router';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { Center } from '../components/Center/Center';
import { GraphsAsScenarios } from '../components/GraphsAsScenarios/GraphsAsScenarios';
import styles from '../styles/static.module.css';

export default function HomePage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1>AI Web Maker</h1>
                        <GraphsAsScenarios />
                    </Center>
                </main>
            </div>
        </>
    );
}

/**
 * TODO: !!! Put here some footer
 * TODO: !!! Put here some idea explanation
 * TODO: !!! Nicer fonts / handwritten
 * TODO: !!! DO not redirect to random wallpaper provide 3 scenarios:
 *       - 🙄 No idea
 *       - 💡 Idea
 *       - 🖼 Image
 * TODO: Go to last wallpaper
 * TODO: Make shuffle between wallpapers
 */
