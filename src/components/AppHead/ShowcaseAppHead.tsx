import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode, useContext } from 'react';
import spaceTrim from 'spacetrim';
import favicon from '../../../public/favicon.ico';
import { AnalyticsAndIntegrations } from '../../components/AnalyticsAndIntegrations/AnalyticsAndIntegrations';
import { ExportContext } from '../../pages/_app';
import { extractFirstParagraphFromMarkdown } from '../../utils/content/extractFirstParagraphFromMarkdown';
import { removeMarkdownFormatting } from '../../utils/content/removeMarkdownFormatting';
import { removeMarkdownLinks } from '../../utils/content/removeMarkdownLinks';
import { useWallpaper } from '../../utils/hooks/useWallpaper';

interface ShowcaseAppHeadProps {
    children?: ReactNode;
}

/**
 * @@@
 */
export function ShowcaseAppHead(props: ShowcaseAppHeadProps) {
    const { children } = props;
    const wallpaper = useWallpaper();
    const { isExported, publicUrl } = useContext(ExportContext);
    const router = useRouter();

    // TODO: !! IWalpaper should have custom emoji which will be contained here

    const title = wallpaper.title; /* <- TODO: !! Apply here (some) font as UTF-8 special chars */
    const description = removeMarkdownFormatting(
        removeMarkdownLinks(extractFirstParagraphFromMarkdown(wallpaper.content)),
    );

    const homeUrl = `${publicUrl.href}/showcase/${wallpaper.id}`; /* <- TODO: Self URL into some configuration */
    const socialImage = wallpaper.src; /* <-  [🦋] */

    const metadataJsx = (
        <>
            {/* Technical */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width" />

            {/* Primary meta tags */}
            <title>{title}</title>
            <link rel="canonical" href={publicUrl.href + router.asPath} />
            <meta name="description" content={description} />
            <link rel="icon" href={favicon.src /* <- TODO: !! Generate icon */} />
            <meta
                name="theme-color"
                content={
                    wallpaper.colorStats.palette[0].value.toHex() /* <- TODO: Is it a good idea to pick theme-color this way */
                }
            />

            {/* Open Graph (Facebook) */}
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={socialImage} />
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
            <meta property="twitter:image" content={socialImage} />

            {/* TODO: !! Presentation version -> canonical */}
        </>
    );
    if (!isExported) {
        // Note: For some strange reason we can not use <Head> in <ShowcasePage> - it fires "NextRouter was not mounted"
        return (
            <>
                <Head>
                    {metadataJsx}
                    {children}
                </Head>
                <AnalyticsAndIntegrations
                    isSmartsuppHidden
                    /*<- Note: <AnalyticsAndIntegrations/> mus be places out of <Head>,
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
                <dd // <- Note: [🎡] Hack !!!@@@
                    dangerouslySetInnerHTML={{
                        __html: spaceTrim(
                            (block) => `
                                <!--------[ Registration: ]-------->
                                <!-- Note: This is a !!!@@@    -->
                                <!--     | Or register at !!!! -->
                                <script src="${publicUrl.href}/api/register-script.js" async defer></script>
                                <!--------[ /Registration ]-------->
                            `,
                        ),
                    }}
                />
            </head>
        );
    }
}

/**
 * TODO: !!! [🎍] Reflect URL into metadata
 * TODO: Create better summary
 * TODO: Maybe import from some JSON
 * TODO: What is ideal viewport value
 * TODO: [🦋] Use here better preview image - with some palette showcase + title + special optimized crops for each usage
 */
