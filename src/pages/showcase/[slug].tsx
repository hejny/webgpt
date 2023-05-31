import { GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { JsonObject } from 'type-fest';
import { getWallpapers } from '../../../scripts/utils/wallpaper/getWallpapers';
import { SkinStyle } from '../../components/SkinStyle/SkinStyle';
import { ShowcaseAppHead } from '../../sections/00-AppHead/ShowcaseAppHead';
import { ShowcaseContent } from '../../sections/ShowcaseContent/ShowcaseContent';
import { ShowcaseContentEdit } from '../../sections/ShowcaseContentEdit/ShowcaseContentEdit';
import { WallpapersContext } from '../../utils/hooks/WallpapersContext';
import { hydrateWallpaper } from '../../utils/hydrateWallpaper';
import { hydrateWallpapers } from '../../utils/hydrateWallpapers';
import { IWallpaper } from '../../utils/IWallpaper';
import { randomItem } from '../../utils/randomItem';

export interface ShowcasePageProps {
    currentWallpaper: IWallpaper & JsonObject;
    randomWallpaper: IWallpaper & JsonObject;
}

export default function ShowcasePage(props: ShowcasePageProps) {
    let { currentWallpaper, randomWallpaper } = props;

    const router = useRouter();
    const wallpaperId = router.query.slug as string;
    // console.log('ShowcasePage', { wallpaperId });

    return (
        <WallpapersContext.Provider
            value={hydrateWallpapers([currentWallpaper])} /* <- Is this the right place to be Provider in? */
        >
            <ShowcaseAppHead isNextHeadUsed />
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

            <ShowcaseContent />
            <ShowcaseContentEdit randomWallpaper={hydrateWallpaper(randomWallpaper)} />
        </WallpapersContext.Provider>
    );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: (await getWallpapers()).map(({ id }) => `/showcase/${id}`), // <- Note: indicates that no page needs be created at build time
        fallback: 'blocking', // <- Note: indicates the type of fallback - TODO: !!! Probbably change to false and solve 404 problem
    };
};

export async function getStaticProps({
    locale,
    params,
}: {
    locale: string;
    params: any /* <- TODO: !! Type propperly + NOT manually */;
}) {
    const { slug } = params;

    const wallpapers = await getWallpapers();
    const currentWallpaper = wallpapers.find(({ id }) => id === slug);
    const randomWallpaper = randomItem(
        ...wallpapers,
    ); /* <- TODO: !! Make big chain to traverse whole gallery by clicking random + minor simmilar chains  */

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
 * TODO: !! Better IDs for wallpapers - make it without GET parameters
 * TODO: !! Make foreground-background paralax effect for each wallpaper @see https://huggingface.co/spaces/radames/dpt-depth-estimation-3d-obj
 * TODO: !! Fix Shuffle without React hydration error

 * TODO: Add somewhere button [Get in touch]
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: Some linting rule not to use:
 *       NOT> import { useTranslation } from 'react-i18next';
 *       BUT
 *       YES> import { useTranslation } from 'next-i18next';
 * TODO: !! Better url than /showcase/...
 * TODO: [👕][🧠] What should be the ID of customized wallpaper?
 */
