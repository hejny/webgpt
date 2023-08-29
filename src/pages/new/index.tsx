import Link from 'next/link';
import { useRouter } from 'next/router';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import styles from '../../styles/static.module.css';

export default function NewWallpaperPage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <h1>AI Web Maker</h1>
                    <ul>
                        <Link href="/new/from-image">
                            <li>Create page from custom image</li>
                        </Link>
                    </ul>
                </main>

                {/* TODO: Make here some footer
                <footer>
                    <FooterSection />
                </footer>
                */}
            </div>
        </>
    );
}

/**
 * TODO: !! Create some meaningfull content by AI recognition
 * TODO: [🕶] <ul><a><li> vs <ul><li><a>
 */
