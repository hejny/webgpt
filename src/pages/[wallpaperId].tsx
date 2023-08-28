import { readFile } from 'fs/promises';
import { GetStaticPaths } from 'next';
import Link from 'next/link';
import { WallpaperAppHead } from '../components/AppHead/WallpaperAppHead';
import { SkinStyle } from '../components/SkinStyle/SkinStyle';
import { WallpaperEditing } from '../components/WallpaperEditing/WallpaperEditing';
import { WallpaperEditingLink } from '../components/WallpaperEditing/WallpaperEditingLink';
import { WallpaperLayout } from '../components/WallpaperLayout/WallpaperLayout';
import { useMode } from '../utils/hooks/useMode';
import { useSsrDetection } from '../utils/hooks/useSsrDetection';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { hydrateWallpapersCached } from '../utils/hydrateWallpapersCached';
import { IWallpaperSerialized } from '../utils/IWallpaper';
import { getSupabaseForServer } from '../utils/supabase/getSupabaseForServer';
import { string_wallpaper_id } from '../utils/typeAliases';
import { validateUuid } from '../utils/validators/validateUuid';

interface WallpaperPageProps {
    currentWallpaper: null | IWallpaperSerialized;
}

export default function WallpaperPage(props: WallpaperPageProps) {
    let { currentWallpaper } = props;
    const { isEditable } = useMode();
    const isServerRender = useSsrDetection();

    if (currentWallpaper === undefined) {
        return <div>Loading...</div> /* <- TODO: Better loading + [👠] Some standard standalone page*/;
    }

    if (currentWallpaper === null) {
        return (
            <div>
                Not found
                <br />
                <Link href="/" /*className={'button'} */>Pick options</Link>
                {/*
                TODO: Pass randomWallpaper in non-hardcoded wallpapers
                <Link href={`/${randomWallpaper.id}`} className={'button'}>
                    Show random
                </Link>
                */}
            </div> /* <- TODO: Better 404 + http 404 + [👠] Some standard standalone page*/
        );
    }

    return (
        <WallpapersContext.Provider
            value={hydrateWallpapersCached([currentWallpaper])} /* <- Is this the right place to be Provider in? */
        >
            <WallpaperAppHead />
            <SkinStyle />
            {/* TODO: <LanguagePicker /> */}

            {/* <Debug /> */}

            {<WallpaperLayout />}
            {isEditable && <WallpaperEditing />}
            {!isEditable && !isServerRender && <WallpaperEditingLink />}
        </WallpapersContext.Provider>
    );
}

export const getStaticPaths: GetStaticPaths<{ wallpaperId: string }> = async () => {
    const prerenderWallpapersIds = new Set<string_wallpaper_id>();

    const { wallpapers: lovedWallpapers } = JSON.parse(
        await readFile('public/mocked-api/wallpapers-min-loved.json' /* <- TODO: [✍] */, 'utf-8'),
    ) as {
        wallpapers: Array<{
            id: string_wallpaper_id;
        }>;
    };
    for (const wallpaper of lovedWallpapers) {
        prerenderWallpapersIds.add(wallpaper.id);
    }

    return {
        paths: Array.from(prerenderWallpapersIds).map((wallpaperId) => `/${wallpaperId}`), // <- Note: indicates which pages needs be created at build time
        fallback: 'blocking',
    };
};

export async function getStaticProps({
    locale,
    params,
}: {
    locale: string;
    params: any /* <- TODO: !! Type propperly + NOT manually */;
}) {
    const { wallpaperId } = params;

    let currentWallpaper: null | IWallpaperSerialized = null;
    const selectResult = await getSupabaseForServer().from('Wallpaper').select('*').eq('id', wallpaperId);
    if (selectResult && selectResult.data && selectResult.data.length > 0) {
        currentWallpaper = {
            ...selectResult.data[0]!,
            author: validateUuid(selectResult.data[0]!.author),
        };
    }

    return {
        props: {
            currentWallpaper,
        },
    };
}

/**
 * TODO: Special effect for each wallpaper
 * TODO: !! Preview as on [Mobile][Tablet][Desktop]
 * TODO: !! Preview as on [Mobile][Tablet] - show the direct QR code
 * TODO: !! Make foreground-background paralax effect for each wallpaper @see https://huggingface.co/spaces/radames/dpt-depth-estimation-3d-obj

 * TODO: Add somewhere button [Get in touch]
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: !! Better url than /...
 * TODO: [👕][🧠] What should be the ID of customized wallpaper?
 */
