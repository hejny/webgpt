import { Center } from '../components/Center/Center';
import { GraphsAsScenarios } from '../components/GraphsAsScenarios/GraphsAsScenarios';
import { HandwrittenText } from '../components/HandwrittenText/HandwrittenText';
import { MarkdownContent } from '../components/MarkdownContent/MarkdownContent';
import { PavolHejny } from '../components/PavolHejny/PavolHejny';
import { StaticLayout } from '../components/StaticLayout/StaticLayout';
import { PAGES_CONTENTS } from '../components/WallpaperContent/getPageContent';
import { Color } from '../utils/color/Color';

export default function HomePage() {
    return (
        <StaticLayout subtitle={null}>
            <header>
                <Center>
                    <h1
                        style={{
                            maxWidth: '700px',
                            // outline: '1px solid red',
                            // transform: 'translate(calc(50% - 300px),-20px)'
                        }}
                    >
                        <HandwrittenText color={Color.from('#fff')} style={'BigPartiallyPartiallyJoined'}>
                            AI Web Maker
                        </HandwrittenText>
                    </h1>
                </Center>
            </header>
            <main>
                <GraphsAsScenarios />
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

            <article>
                <PavolHejny />
            </article>
        </StaticLayout>
    );
}

/**
 * TODO: [🌾] 1-2i page should be made as 1-2i static page
 */
