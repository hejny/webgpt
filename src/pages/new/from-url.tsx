import { useState } from 'react';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { Center } from '../../components/Center/Center';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import { string_url } from '../../utils/typeAliases';
import { isValidUrl } from '../../utils/validators/isValidUrl';

export default function NewWallpaperFromPromptPage() {
    const [url, setUrl] = useState<string_url | null>(null);

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1>AI Web Maker</h1>
                        Write URL to make new web from:
                        <input
                            type="url"
                            placeholder="https://example.com"
                            onChange={(event) => setUrl(event.target.value)}
                        />
                        <button
                            className="button-TODO"
                            onClick={() => {
                                if (!isValidUrl(url)) {
                                    alert('Please write valid URL');
                                }
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
 * TODO: !!! Create also branch for /new/from-instagram
 */
