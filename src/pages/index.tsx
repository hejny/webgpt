import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { redirect } from 'next/navigation';
import { getSupabaseForServer } from '../utils/supabase/getSupabaseForServer';
import { string_wallpaper_id } from '../utils/typeAliases';

interface HomePageProps {
    randomWallpaperId: string_wallpaper_id;
}

export default function HomePage(props: HomePageProps) {
    const { randomWallpaperId } = props;
    redirect(`/${randomWallpaperId}`);
}

export async function getStaticProps({ locale }: { locale: string }) {
    const result = await getSupabaseForServer()
        .from('Wallpaper_random')
        .select('id')
        .eq('isPublic', true)
        .limit(1)
        .single();

    const randomWallpaperId = result.data?.id;
    if (!randomWallpaperId) {
        throw new Error('No random wallpaper found');
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            ...({ randomWallpaperId } satisfies HomePageProps),
        },
    };
}

/**
 * TODO: !!! Use RandomWallpaperManager here
 *       - Go to last wallpaper
 *       - Make shuffle between wallpapers
 * TODO: Use same pattern for props ACRY
 */
