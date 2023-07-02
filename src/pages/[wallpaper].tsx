import { GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { JsonObject } from 'type-fest';
import { getWallpapers } from '../../scripts/utils/wallpaper/getWallpapers';
import { ShowcaseAppHead } from '../components/AppHead/ShowcaseAppHead';
import { ExplainContent } from '../components/ExplainContent/ExplainContent';
import { ShowcaseContent } from '../components/ShowcaseContent/ShowcaseContent';
import { ShowcaseContentEdit } from '../components/ShowcaseContentEdit/ShowcaseContentEdit';
import { SkinStyle } from '../components/SkinStyle/SkinStyle';
import { useMode } from '../utils/hooks/useMode';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { hydrateWallpaper } from '../utils/hydrateWallpaper';
import { hydrateWallpapers } from '../utils/hydrateWallpapers';
import { IWallpaper } from '../utils/IWallpaper';
import { randomItem } from '../utils/randomItem';
import { getSupabaseForServer } from '../utils/supabase/getSupabaseForServer';

export interface ShowcasePageProps {
    currentWallpaper: null | (IWallpaper & JsonObject);
    randomWallpaper: IWallpaper & JsonObject;
}

export default function ShowcasePage(props: ShowcasePageProps) {
    let { currentWallpaper, randomWallpaper } = props;
    const { isExplaining, isPresenting } = useMode();

    console.log(currentWallpaper);

    if (currentWallpaper === undefined) {
        return <div>Loading...</div> /* <- TODO: Better loading + [👠] Some standard standalone page*/;
    }

    if (currentWallpaper === null) {
        return (
            <div>
                Not found
                <br />
                <Link href="/" /*className={'button'} */>Pick from gallery</Link>
                {/*
                TODO: Pass randomWallpaper in dynamic wallpapers
                <Link href={`/${randomWallpaper.id}`} className={'button'}>
                    Show random
                </Link>
                */}
            </div> /* <- TODO: Better 404 + http 404 + [👠] Some standard standalone page*/
        );
    }

    return (
        <WallpapersContext.Provider
            value={hydrateWallpapers([currentWallpaper])} /* <- Is this the right place to be Provider in? */
        >
            <ShowcaseAppHead />
            <SkinStyle />
            {/* TODO: <LanguagePicker /> * /}
            
        

            {/* !!! Remove 
            <Head>
                <link
                    // TODO: !!! Is this working? Maybe use prerender
                    rel="prerender"
                    href={randomWallpaper.src}
                    as="image" /* <- Note: [🤰] Here is preloaded randomWallpaper * /
                />
            </Head>
            */}

            {isExplaining && <ExplainContent />}
            {!isExplaining && <ShowcaseContent />}
            {!isExplaining && !isPresenting && (
                <ShowcaseContentEdit randomWallpaper={hydrateWallpaper(randomWallpaper)} />
            )}
        </WallpapersContext.Provider>
    );
}

export const getStaticPaths: GetStaticPaths<{ wallpaper: string }> = async () => {
    return {
        paths: (await getWallpapers()).map(({ id }) => `/${id}`), // <- Note: indicates which pages needs be created at build time
        fallback: true,
    };
};

export async function getStaticProps({
    locale,
    params,
}: {
    locale: string;
    params: any /* <- TODO: !! Type propperly + NOT manually */;
}) {
    const { wallpaper } = params;

    const wallpapers = await getWallpapers().catch((error) => [
        /* Note: On server, "Error: Could not find assets folder" will happen */
    ]);
    let currentWallpaper = wallpapers.find(({ id }) => id === wallpaper) || null;

    if (!currentWallpaper) {
        const selectResult = await getSupabaseForServer().from('Wallpaper').select('*').eq('id', wallpaper);
        if (selectResult && selectResult.data && selectResult.data.length > 0) {
            currentWallpaper = selectResult.data[0];
        }
    }

    let randomWallpaper = randomItem(
        ...wallpapers,
    ); /* <- TODO: !! Make big chain to traverse whole gallery by clicking random + minor simmilar chains  */

    if (!randomWallpaper && currentWallpaper) {
        // TODO: !!!! This is a dirty hack to prevent error on server - Solve better
        randomWallpaper = currentWallpaper;
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

            currentWallpaper,
            randomWallpaper,
        },
    };
}

/**
 * TODO: !!! Font must be applied to whole page NOT only the article 
 * TODO: Special effect for each wallpaper
 * TODO: !! Preview as on [Mobile][Tablet][Desktop]
 * TODO: !! Preview as on [Mobile][Tablet] - show the direct QR code
 * TODO: !!! [🧶] Add overlay which explains how it works and lead to FAQ permalink
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
