import Head from 'next/head';
import favicon from '../../../public/favicon.ico';
import { LanguagePicker } from '../../components/LanguagePicker/LanguagePicker';
import { SkinStyle } from '../../components/SkinStyle/SkinStyle';
import { removeMarkdownFormatting } from '../../utils/content/removeMarkdownFormatting';
import { removeMarkdownLinks } from '../../utils/content/removeMarkdownLinks';
import { useSkin } from '../../utils/hooks/useSkin';
import { useWallpaper } from '../../utils/hooks/useWallpaper';

/**
 * A functional component that renders the head element and the language picker ⁘
 *
 * @param {AppHeadProps} props - The props for the component
 * @returns {JSX.Element} - The JSX element for the component
 */
interface AppHeadProps {
    subtitle?: string /* <- !!! Remove */;
}

/**
 * @@@
 */
export function AppHead(props: AppHeadProps) {
    const { subtitle } = props;

    // TODO: !!! Populate ONLY from Wallpaper

    const wallpaper =
        useWallpaper(/* <- TODO: !! Here should be useSkin - ISkin should contain url of the wallpaper */);
    const skin = useSkin();

    const title = '!!!';
    const description = removeMarkdownFormatting(removeMarkdownLinks(wallpaper.content));

    const homeUrl = 'https://www.ai.ai.hejny.org'; /* <- TODO: Self URL into some configuration */

    return (
        <>
            <Head>
                {/* Technical */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width" />

                {/* Primary meta tags */}
                <title>!!!</title>
                <meta name="description" content={removeMarkdownFormatting(removeMarkdownLinks(wallpaper.content))} />
                <link rel="icon" href={favicon.src /* <- TODO: !! Generate icon */} />
                <meta
                    name="theme-color"
                    content={skin.mainBackground /* <- TODO: Is it a good idea to pick theme-color this way */}
                />

                {/* Open Graph (Facebook) */}
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content={title} />
                <meta property="og:description" content={description} />
                <meta
                    property="og:image"
                    content={wallpaper.src /* <- TODO: [🎭] Make special optimized crops for each usage */}
                />
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
                <meta
                    property="twitter:image"
                    content={wallpaper.src /* <- TODO: [🎭] Make special optimized crops for each usage */}
                />
            </Head>
            <LanguagePicker />
            <SkinStyle />
        </>
    );
}

/**
 * TODO: Create better summary
 * TODO: Maybe import from some JSON
 * TODO: What is ideal viewport value
 */
