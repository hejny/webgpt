import Head from 'next/head';
import { NEXT_PUBLIC_URL } from '../../../config';
import favicon from '../../../public/favicon.ico';
import gallery1Image from '../../../public/screenshots/gallery-1.png';
import { AnalyticsAndIntegrations } from '../../components/AnalyticsAndIntegrations/AnalyticsAndIntegrations';

interface StaticAppHeadProps {
    /**
     * Title of the page which will be displayed in browser tab
     */
    subtitle: string | null;
}

/**
 * Renders the head section of the static app
 */
export function StaticAppHead(props: StaticAppHeadProps) {
    const { subtitle } = props;

    // TODO: !! Use translation
    const title = (subtitle ? subtitle + ' 🎨 ' : '') + `AI Web Maker`;
    const description = `Thousands of AI generated web designs`;

    return (
        <>
            <Head>
                {/* Technical */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width" />

                {/* Primary meta tags */}
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href={favicon.src /* <- TODO: !! Generate icon */} />
                <meta name="theme-color" content={'#121121' /* <- TODO: Color to config */} />

                {/* Open Graph (Facebook) */}
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={gallery1Image.src} />
                <meta property="og:url" content={NEXT_PUBLIC_URL.href} />
                <meta property="og:type" content="website" /* <- TODO: Make this dynamic */ />

                {/* Facebook */}
                <meta property="fb:page_id" content="hejny" />
                <meta property="fb:app_id" content="179993545901102" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={NEXT_PUBLIC_URL.href} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:image" content={gallery1Image.src} />
            </Head>

            <AnalyticsAndIntegrations
            /* <- Note: <AnalyticsAndIntegrations/> must be placed out of <Head>,
                        otherwise error "NextRouter was not mounted" occures
            */
            />
            {/* TODO: <LanguagePicker /> */}
        </>
    );
}

/**
 * TODO: Create better summary
 * TODO: Maybe import from some JSON
 * TODO: What is ideal viewport value
 */
