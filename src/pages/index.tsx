import { useRouter } from 'next/router';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { Center } from '../components/Center/Center';
import { GraphsAsScenarios } from '../components/GraphsAsScenarios/GraphsAsScenarios';
import styles from '../styles/static.module.css';

export default function HomePage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1>AI Web Maker</h1>
                        {/* TODO: !! Use or remove <HandwrittenText color={Color.from('#fff')}>AI Web Maker</HandwrittenText> */}
                        <GraphsAsScenarios />
                    </Center>
                </main>

                {/*
                TODO: !!! Design and layout
                <MarkdownContent content={PAGES_CONTENTS.explanation!} />
                */}
            </div>
        </>
    );
}

/**
 * TODO: !! Put here some footer
 * TODO: !! Nicer fonts / handwritten
 */
