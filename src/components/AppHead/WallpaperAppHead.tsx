import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode, useContext } from 'react';
import { NEXT_PUBLIC_URL } from '../../../config';
import { AnalyticsAndIntegrations } from '../../components/AnalyticsAndIntegrations/AnalyticsAndIntegrations';
import { extractDescriptionFromHtml } from '../../utils/content/extractDescriptionFromHtml';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { ExportCommentedBlock } from '../ExportComment/ExportCommentedBlock';

// !!! Go through>  children?: ReactNode;

interface WallpaperAppHeadProps {
    /**
     * Additional content to be placed into top of the <head>
     */
    children?: ReactNode;
}

/**
 * Renders the head section of the wallpaper app
 */
export function WallpaperAppHead(props: WallpaperAppHeadProps) {
    const { children } = props;
    const [wallpaper] = useWallpaper();
    const { isExported, publicUrl } = useContext(ExportContext);
    const router = useRouter();

    // TODO: !! IWalpaper should have custom emoji which will be contained here

    const title = wallpaper.title; /* <- TODO: !! Apply here (some) font as UTF-8 special chars */
    const description =
        extractDescriptionFromHtml(wallpaper.content) /* <- !! Shorten a description with GPT */ ||
        'The page was created by 1-2i.com';

    const homeUrl = `${publicUrl.href}${wallpaper.id}`; /* <- TODO: Self URL into some configuration */

    const socialImageUrl = wallpaper.src;

    /*
    TODO: [👔] When there is working og-image API route, use it
    const socialImageUrl = `${publicUrl.href}api/og-image?wallpaperId=${wallpaper.id}`;
    */

    const faviconImageUrl = wallpaper.src; /* <- TODO: !! Generate propper icon [🦋] */

    const metadataJsx = (
        <>
            {/* Technical */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width" />

            {/* Primary meta tags */}
            <title>{title}</title>
            <link rel="canonical" href={publicUrl.href + router.asPath} />
            <meta name="description" content={description} />
            <link rel="icon" type="image/png" href={faviconImageUrl} />
            <meta
                name="theme-color"
                content={
                    wallpaper.colorStats.palette[0]!.value.toHex() /* <- TODO: Is it a good idea to pick theme-color this way */
                }
            />

            {/* Open Graph (Facebook) */}
            {/* TODO: !! A way how to export comments (in html) */}
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={socialImageUrl} />
            <meta property="og:url" content={homeUrl} />
            <meta property="og:type" content="website" /* <- TODO: Make this dynamic */ />

            {/* Facebook */}
            <meta property="fb:page_id" content="hejny" />
            <meta property="fb:app_id" content="179993545901102" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={homeUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={socialImageUrl} />

            {/* TODO: !! Presentation version -> canonical */}
        </>
    );
    if (!isExported) {
        // Note: For some strange reason we can not use <Head> in <WallpaperPage> - it fires "NextRouter was not mounted"
        return (
            <>
                <Head>
                    {metadataJsx}
                    {children}
                </Head>
                <AnalyticsAndIntegrations

                /* <- Note: <AnalyticsAndIntegrations/> musT be placed out of <Head>,
                            otherwise error "NextRouter was not mounted" occures
                */
                />
            </>
        );
    } else {
        return (
            // Note: We are using this in export context, so we don't use <Head> component from Next
            /* eslint-disable-next-line @next/next/no-head-element */
            <head>
                {metadataJsx}
                {children}
                <ExportCommentedBlock
                    name="Registration"
                    note={`

                        [🔌] This is a registration script for the page ${publicUrl}
                             You need to visit at least once the site ${publicUrl} to register it
                             Or register manually at https://1-2i.com/${wallpaper.id}?modal=export

                             After the registration you can remove this section or leave it here for future updates
                             For more info see https://1-2i.com/${wallpaper.id}?page=license

                    `}
                >
                    <script
                        src={`${
                            NEXT_PUBLIC_URL.href /* <- Note Here should be really used the global NEXT_PUBLIC_URL NOT publicUrl */
                        }api/register-script?wallpaperId=${wallpaper.id}`}
                        async
                        defer
                    ></script>
                </ExportCommentedBlock>
            </head>
        );
    }
}

/**
 * TODO: !! [🎍] Reflect URL into metadata
 * TODO: Create better summary
 * TODO: Maybe import from some JSON
 * TODO: What is ideal viewport value
 * TODO: [🦋] Use here better preview image - with some palette wallpaper + title + special optimized crops for each usage
 */
