import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { NoSsr } from '../components/NoSsr/NoSsr';
import { WelcomeWallpaperShuffle } from '../components/WelcomeWallpaperShuffle/WelcomeWallpaperShuffle';

interface HomePageProps {}

export default function HomePage(props: HomePageProps) {
    return (
        <>
            <StaticAppHead subtitle="1-2i" />

            <main>
                <NoSsr>
                    <WelcomeWallpaperShuffle />
                </NoSsr>
            </main>
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
 * TODO: !!!! Make fallback for sharing and search (Like OG images etc...)
 * TODO: Go to last wallpaper
 * TODO: Make shuffle between wallpapers
 */
