import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import favicon from '../../../public/favicon.ico';
import cave_of_ideas_with_transparent_look_through from '../../../public/wallpapers/Pavol_Hejn_cave_of_ideas_with_transparent_look_through_fe3480c5-76af-45da-ac4e-5177062bcb6b.png';
import { LanguagePicker } from '../../components/LanguagePicker/LanguagePicker';
import { removeMarkdownFormatting } from '../../utils/content/removeMarkdownFormatting';
import { removeMarkdownLinks } from '../../utils/content/removeMarkdownLinks';

interface AppHeadProps {
    subtitle?: string;
}

export function AppHead(props: AppHeadProps) {
    const { subtitle } = props;

    const { t } = useTranslation();
    const title = removeMarkdownFormatting(removeMarkdownLinks(t('title') || ''));
    const description = removeMarkdownFormatting(removeMarkdownLinks(t('description') || ''));

    const homeUrl = 'https://www.pavolhejny.com'; /* <- TODO: Self URL into some configuration */

    return (
        <>
            <Head>
                {/* Technical */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width" />

                {/* Primary meta tags */}
                <title>{`${!subtitle ? `` : `${subtitle} ✨ `}${title}`}</title>
                <meta name="description" content={description} />
                <link rel="icon" href={favicon.src} />
                <meta name="theme-color" content="#000000" />

                {/* Open Graph (Facebook) */}
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={homeUrl + cave_of_ideas_with_transparent_look_through.src} />
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
                <meta property="twitter:image" content={homeUrl + cave_of_ideas_with_transparent_look_through.src} />
            </Head>
            <LanguagePicker />
        </>
    );
}

/**
 * TODO: Create better summary
 * TODO: Maybe import from some JSON
 * TODO: What is ideal viewport value
 */
