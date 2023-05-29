import Head from 'next/head';
import favicon from '../../../public/favicon.ico';
import gallery1Image from '../../../public/screenshots/gallery-1.png';

interface StaticAppHeadProps {
    subtitle: string | null;
}

/**
 * @@@
 */
export function StaticAppHead(props: StaticAppHeadProps) {
    const { subtitle } = props;

    // TODO: !! Use translation
    const title = (subtitle ? subtitle + ' 🎨 ' : '') + `AI Web Maker`;
    const description = `Thousands of AI generated web designs`;
    const homeUrl = 'https://ai.hejny.org'; /* <- TODO: Self URL into some configuration */

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
                <meta name="theme-color" content={'#000000'} />

                {/* Open Graph (Facebook) */}
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={gallery1Image.src} />
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
                <meta property="twitter:image" content={gallery1Image.src} />
            </Head>
            {/* TODO: <LanguagePicker /> */}
        </>
    );
}

/**
 * TODO: Create better summary
 * TODO: Maybe import from some JSON
 * TODO: What is ideal viewport value
 */
