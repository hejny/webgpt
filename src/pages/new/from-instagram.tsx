import { fetchUser } from 'insta-fetcher';
import { useRef } from 'react';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { Center } from '../../components/Center/Center';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;

export default function NewWallpaperFromInstagramPage() {
    const instagramNameInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1>AI Web Maker</h1>
                        Write your Instagram name to make new web from:
                        <input type="text" placeholder="@hejny" ref={instagramNameInputRef} />
                        <button
                            className="button-TODO"
                            onClick={() => {
                                const instagramName = instagramNameInputRef.current?.value;

                                fetchUser();
                            }}
                        >
                            Create
                        </button>
                    </Center>
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
 * TODO: [👐] Unite design of all /new/* pages
 * TODO: !!! Implement
 * TODO: Lazy-load insta-fetcher
 * TODO: [🏍] Standardize process of getting input data for new wallpaper
 */
