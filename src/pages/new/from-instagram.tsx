import { useRef } from 'react';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { Center } from '../../components/SimpleLayout/Center';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import type { ScrapeInstagramUserResponse } from '../api/scrape/scrape-instagram-user';

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
                        <br />
                        <input type="text" placeholder="@pavolhejny" ref={instagramNameInputRef} />
                        <button
                            className="button-TODO"
                            onClick={async () => {
                                const instagramName = instagramNameInputRef.current?.value;

                                const reponse = await fetch(
                                    `/api/scrape/scrape-instagram-user?instagramName=${instagramName}`,
                                );
                                const { instagramUser } = (await reponse.json()) as ScrapeInstagramUserResponse;

                                console.info('👤', { instagramUser });

                                // TODO: !!! Make CORS proxy for images
                                const profileImageResponse = await fetch(instagramUser.hd_profile_pic_url_info.url);
                                const profileImage = await profileImageResponse.blob();

                                console.info('👤', { profileImage });
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
 * TODO: !!! Wotk with @ wihoout @ (and with https://www.instagram.com/...)
 * TODO: [👐] Unite design of all /new/* pages
 * TODO: !!! Implement
 * TODO: [🏍] Standardize process of getting input data for new wallpaper
 */
