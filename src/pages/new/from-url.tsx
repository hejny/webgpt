import { useRef } from 'react';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { Center } from '../../components/Center/Center';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import { isValidUrl } from '../../utils/validators/isValidUrl';
import type { ScrapeWebResponse } from '../api/scrape/scrape-web';

export default function NewWallpaperFromPromptPage() {
    const urlInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1>AI Web Maker</h1>
                        Write URL to make new web from:
                        <br />
                        <input type="url" placeholder="https://example.com" ref={urlInputRef} />
                        <button
                            className="button-TODO"
                            onClick={async () => {
                                const url = urlInputRef.current?.value;

                                if (!isValidUrl(url)) {
                                    alert('Please write valid URL');
                                }

                                const reponse = await fetch(`/api/scrape/scrape-web?url=${url}`);
                                const { webInfo } = (await reponse.json()) as ScrapeWebResponse;

                                console.info('🌍', { webInfo });
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
 * TODO: !!! Implement
 * TODO: [👐] Unite design of all /new/* pages
 */
