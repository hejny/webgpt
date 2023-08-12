import { readFile } from 'fs/promises';
import { GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IWallpaperSerialized } from '../../utils/IWallpaper';
import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';
import { string_wallpaper_id } from '../../utils/typeAliases';
import { validateUuid } from '../../utils/validators/validateUuid';

interface ShowcasePageProps {
    currentWallpaper: null | IWallpaperSerialized;
}

// TODO: !!!! Apply also font here and split between the page and controls

export default function ShowcasePage(props: ShowcasePageProps) {
    return <>Dynamic test</>;
}

export const getStaticPaths: GetStaticPaths<{ wallpaper: string }> = async () => {
    const prerenderWallpapersIds = new Set<string_wallpaper_id>();

    /*/
    for (const wallpaper of await getHardcodedWallpapers()) {
        prerenderWallpapersIds.add(wallpaper.id);
    }
    /**/

    /**/
    const { wallpapers: lovedWallpapers } = JSON.parse(
        await readFile('public/mocked-api/wallpapers-min-loved.json', 'utf-8'),
    ) as {
        wallpapers: Array<{
            id: string_wallpaper_id;
        }>;
    };
    for (const wallpaper of lovedWallpapers) {
        prerenderWallpapersIds.add(wallpaper.id);
    }
    /**/

    return {
        paths: Array.from(prerenderWallpapersIds).map((wallpaperId) => `/test/${wallpaperId}`), // <- Note: indicates which pages needs be created at build time
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
    const { wallpaper /* <- TODO: !!! Change ACRY to wallpaperId */ } = params;

    // TODO: [🥽] DRY - getWallpaper
    // TODO: !!! First dynamic then hardcoded
    const wallpapers: Array<IWallpaperSerialized> = []; //await getHardcodedWallpapers().catch((error) => []);
    let currentWallpaper = wallpapers.find(({ id }) => id === wallpaper) || null;
    if (!currentWallpaper) {
        const selectResult = await getSupabaseForServer().from('Wallpaper').select('*').eq('id', wallpaper);
        if (selectResult && selectResult.data && selectResult.data.length > 0) {
            currentWallpaper = {
                ...selectResult.data[0],
                author: validateUuid(selectResult.data[0].author),
            };
        }
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            currentWallpaper,
        },
    };
}

/**
 * TODO: !!! Font must be applied to whole page NOT only the article
 * TODO: Special effect for each wallpaper
 * TODO: !! Preview as on [Mobile][Tablet][Desktop]
 * TODO: !! Preview as on [Mobile][Tablet] - show the direct QR code
 * TODO: !! Make foreground-background paralax effect for each wallpaper @see https://huggingface.co/spaces/radames/dpt-depth-estimation-3d-obj

 * TODO: Add somewhere button [Get in touch]
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: Some linting rule not to use:
 *       NOT> import { useTranslation } from 'react-i18next';
 *       BUT
 *       YES> import { useTranslation } from 'next-i18next';
 * TODO: !! Better url than /...
 * TODO: [👕][🧠] What should be the ID of customized wallpaper?
 */
