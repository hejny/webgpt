import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Barlow_Condensed } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { RandomWallpaperManager } from '../components/ControlPanel/RandomWallpaper/RandomWallpaperManager';
import styles from '../styles/static.module.css';
import { classNames } from '../utils/classNames';

const font = Barlow_Condensed(
    { weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] } /* <- TODO: !!! Maybe remove */,
);

export default function HomePage() {
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const randomWallpaperManager = RandomWallpaperManager.getInstance();
            const wallpaper = await randomWallpaperManager.getWelcomeWallpaper();
            router.replace(`/${wallpaper.id}`);
        })();
    });

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={classNames(styles.page, font.className)}>
                <main>
                    <h1>1-2i</h1>
                    {/* !!! Generating animation */}
                </main>
            </div>
        </>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

/**
 * TODO: !!!! This should serve for sharing and search (Like OG images etc...)
 * TODO: Go to last wallpaper
 * TODO: Make shuffle between wallpapers
 */
