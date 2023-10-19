import Image from 'next/image';
import webgptLogo from '../../public/logo/webgpt.white.svg';
import { MarkdownContent } from '../components/MarkdownContent/MarkdownContent';
import { NoSsr } from '../components/NoSsr/NoSsr';
import { PavolHejny } from '../components/PavolHejny/PavolHejny';
import { PreviewGallery } from '../components/PreviewGallery/PreviewGallery';
import { Scenarios } from '../components/Scenarios/Scenarios';
import { Center } from '../components/SimpleLayout/Center';
import { StaticLayout } from '../components/StaticLayout/StaticLayout';
import { PAGES_CONTENTS } from '../components/WallpaperContent/getPageContent';

export default function HomePage() {
    return (
        <StaticLayout subtitle={null}>
            <header>
                <Center>
                    <h1
                    // style={{ maxWidth: '700px'}}
                    >
                        <Image alt="WebGPT logo" src={webgptLogo} />
                        {/*
                        <HandwrittenText color={Color.from('#fff')} style={'BigPartiallyPartiallyJoined'}>
                            WebGPT
                        </HandwrittenText>
                        */}
                    </h1>
                </Center>
            </header>

            <main>
                <Scenarios />
            </main>

            <article>
                <MarkdownContent content={PAGES_CONTENTS.explanation!} />
            </article>

            {/*
            TODO:
            <article>
                <MarkdownContent content={PAGES_CONTENTS.gallery!} />
            </article>
            */}

            {/*
            TODO:
            <article>
                <MarkdownContent content={PAGES_CONTENTS.pricing!} />
            </article>
            */}

            <NoSsr>
                <article>
                    <PreviewGallery numberOfWallpapers={4} />
                    {/*
                    <Link href="/portfolio" className="button">
                        More
                    </Link>
                    */}
                </article>
            </NoSsr>

            <article>
                <PavolHejny />
            </article>
        </StaticLayout>
    );
}

/**
 * TODO: [🌾] WebGPT page should be made as WebGPT static page
 */
