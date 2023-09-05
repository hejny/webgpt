import { useRouter } from 'next/router';
import { Center } from '../components/Center/Center';
import { GraphsAsScenarios } from '../components/GraphsAsScenarios/GraphsAsScenarios';
import { MarkdownContent } from '../components/MarkdownContent/MarkdownContent';
import { StaticLayout } from '../components/StaticLayout/StaticLayout';
import { PAGES_CONTENTS } from '../components/WallpaperContent/getPageContent';

export default function HomePage() {
    const router = useRouter();

    return (
        <StaticLayout subtitle={null}>
            <main>
                <Center>
                    <h1>AI Web Maker</h1>
                    {/* TODO: !! Use or remove <HandwrittenText color={Color.from('#fff')}>AI Web Maker</HandwrittenText> */}
                    <GraphsAsScenarios />
                </Center>
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

            {/*
            TODO:
            <article>
                <MarkdownContent content={PAGES_CONTENTS.contact!} />
            </article>
            */}
        </StaticLayout>
    );
}

/**
 * TODO: !!! Design and layout
 * TODO: !! Put here some footer
 * TODO: !! Nicer fonts / handwritten
 */
